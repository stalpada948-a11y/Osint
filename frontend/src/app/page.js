"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://osint-backend-ie6l.onrender.com";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(`${API_URL}/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert("Error connecting to OSINT Engine Backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "'Courier New', monospace", background: "#090d16", color: "#00ffcc", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #00ffcc", paddingBottom: "15px", marginBottom: "30px" }}>
        <h1 style={{ margin: 0, fontSize: "28px", textTransform: "uppercase" }}>⚡ OSINT Recon Portal Max</h1>
        <p style={{ margin: "5px 0 0 0", color: "#888" }}>Universal Footprint, WHOIS, Breach & Social Recon Engine</p>
      </header>

      <form onSubmit={handleSearch} style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Username, Email, Phone (+91...), or Domain..."
          style={{
            padding: "14px",
            width: "450px",
            borderRadius: "4px",
            border: "1px solid #00ffcc",
            background: "#111827",
            color: "#fff",
            outline: "none",
            fontSize: "15px"
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 28px",
            background: loading ? "#555" : "#00ffcc",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px"
          }}
        >
          {loading ? "SCANNING TARGET..." : "EXECUTE RECON"}
        </button>
      </form>

      {results && (
        <div style={{ background: "#111827", border: "1px solid #1f2937", padding: "25px", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <h2 style={{ margin: 0, color: "#fff" }}>Target: <span style={{ color: "#00ffcc" }}>{results.target}</span></h2>
            <span style={{ background: "#1e293b", padding: "4px 12px", borderRadius: "4px", color: "#fbbf24", fontWeight: "bold" }}>
              TYPE: {results.type.toUpperCase()}
            </span>
          </div>

          <pre style={{
            background: "#030712",
            padding: "20px",
            borderRadius: "6px",
            color: "#38bdf8",
            overflowX: "auto",
            border: "1px solid #1f2937",
            fontSize: "14px"
          }}>
            {JSON.stringify(results.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
  }
        
