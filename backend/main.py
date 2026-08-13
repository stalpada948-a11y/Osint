import os
import re
import json
import asyncio
import subprocess
import whois
import dns.resolver
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Max Level OSINT Recon Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def classify_input(query: str):
    email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    domain_regex = r"^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$"
    phone_regex = r"^\+?[1-9]\d{1,14}$"
    
    if re.match(email_regex, query):
        return "email"
    elif re.match(domain_regex, query):
        return "domain"
    elif re.match(phone_regex, query):
        return "phone"
    else:
        return "username"

# --- Advanced Modules ---
def fetch_domain_info(domain: str):
    try:
        w = whois.whois(domain)
        answers = dns.resolver.resolve(domain, 'A')
        ips = [rdata.to_text() for rdata in answers]
        return {
            "registrar": w.registrar,
            "creation_date": str(w.creation_date),
            "expiration_date": str(w.expiration_date),
            "ip_addresses": ips,
            "name_servers": w.name_servers
        }
    except Exception as e:
        return {"error": f"Domain lookup failed: {str(e)}"}

async def run_sherlock_cli(username: str):
    """Executes Sherlock CLI on system if installed, falls back to direct API check"""
    try:
        proc = await asyncio.create_subprocess_exec(
            "sherlock", username, "--json", "output.json", "--timeout", "1",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        await proc.communicate()
        if os.path.exists("output.json"):
            with open("output.json", "r") as f:
                data = json.load(f)
            os.remove("output.json")
            return data
    except Exception:
        pass

    # Direct Lightweight Fallback Check
    platforms = {
        "GitHub": f"https://github.com/{username}",
        "Instagram": f"https://www.instagram.com/{username}",
        "Twitter": f"https://x.com/{username}",
        "Pinterest": f"https://www.pinterest.com/{username}"
    }
    found = {}
    for site, url in platforms.items():
        try:
            res = requests.get(url, timeout=2)
            found[site] = {"url": url, "status": "Found" if res.status_code == 200 else "Not Found"}
        except:
            found[site] = {"url": url, "status": "Error"}
    return found

async def run_holehe_cli(email: str):
    """Executes Holehe email lookup via Subprocess"""
    try:
        proc = await asyncio.create_subprocess_exec(
            "holehe", email, "--only-used",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        return {"registered_sites": stdout.decode().splitlines()}
    except Exception:
        return {"status": "Holehe CLI not configured on host server. Email footprint check skipped."}

# --- Main OSINT API Endpoint ---
@app.get("/api/search")
async def run_osint_search(query: str):
    if not query:
        raise HTTPException(status_code=400, detail="Query input target is missing")
    
    target_type = classify_input(query)
    results = {"target": query, "type": target_type, "data": {}}

    if target_type == "domain":
        results["data"]["whois_dns"] = fetch_domain_info(query)
    
    elif target_type == "username":
        results["data"]["social_profiles"] = await run_sherlock_cli(query)
    
    elif target_type == "email":
        username_part = query.split("@")[0]
        results["data"]["social_profiles"] = await run_sherlock_cli(username_part)
        results["data"]["email_leaks"] = await run_holehe_cli(query)
        
    elif target_type == "phone":
        results["data"]["phone_info"] = {
            "raw_input": query,
            "status": "Carrier lookup requires NumLookup/Twilio API Key configuration."
        }

    return results
      
