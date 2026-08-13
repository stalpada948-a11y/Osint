"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; // Top import

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://osint-backend-ie6l.onrender.com";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(`${API_URL}/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("API Connection Error");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert("Error connecting to OSINT Engine Backend!");
    } finally {
      setLoading(false);
    }
  };

  const handleMockPayment = () => {
    setPaymentDone(true);
    setTimeout(() => {
      setShowModal(false);
      setPaymentDone(false);
      alert("Demo Payment Successful! VIP Features Unlocked.");
    }, 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1e0b36 0%, #0a0314 100%)",
      color: "#f3e8ff",
      fontFamily: "'Inter', sans-serif",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      
      {/* Navigation Bar Header */}
      <Navbar />

      {/* Header Section */}
      <header style={{
        textAlign: "center",
        marginBottom: "40px",
        backdropFilter: "blur(12px)",
        background: "rgba(168, 85, 247, 0.05)",
        border: "1px solid rgba(168, 85, 247, 0.2)",
        padding: "30px 40px",
        borderRadius: "20px",
        boxShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
        maxWidth: "700px",
        width: "100%"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "800",
          letterSpacing: "1px",
          color: "#c084fc",
          textShadow: "0 0 15px rgba(192, 132, 252, 0.6)",
          margin: "0 0 10px 0"
        }}>
          ⚡ OSINT RECON PORTAL MAX
        </h1>
        <p style={{ color: "#a855f7", margin: 0, fontSize: "14px", letterSpacing: "0.5px" }}>
          Universal Footprint, WHOIS, Breach & Social Recon Engine
        </p>
      </header>

      {/* Main Search Glass Card */}
      <div style={{
        backdropFilter: "blur(16px)",
        background: "rgba(23, 15, 38, 0.6)",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        borderRadius: "24px",
        padding: "35px",
        boxShadow: "0 8px 32px 0 rgba(112, 26, 117, 0.25)",
        maxWidth: "650px",
        width: "100%",
        marginBottom: "30px"
      }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Username, Email, Phone, or IP..."
            style={{
              padding: "16px 20px",
              borderRadius: "14px",
              border: "1px solid rgba(192, 132, 252, 0.4)",
              background: "rgba(10, 3, 20, 0.8)",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: "16px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
              }}
            >
              {loading ? "SEARCHING TARGET..." : "EXECUTE RECON"}
            </button>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              style={{
                flex: 1,
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid #c084fc",
                background: "rgba(192, 132, 252, 0.1)",
                color: "#c084fc",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              💎 Upgrade VIP
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {results && (
        <div style={{
          backdropFilter: "blur(16px)",
          background: "rgba(23, 15, 38, 0.7)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          borderRadius: "20px",
          padding: "25px",
          maxWidth: "650px",
          width: "100%",
          boxShadow: "0 0 25px rgba(168, 85, 247, 0.2)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <span style={{ color: "#e9d5ff", fontWeight: "bold" }}>Target: <span style={{ color: "#c084fc" }}>{results.target}</span></span>
            <span style={{ background: "#7e22ce", padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold" }}>
              TYPE: {results.type?.toUpperCase()}
            </span>
          </div>
          <pre style={{
            background: "#0a0314",
            padding: "15px",
            borderRadius: "12px",
            overflowX: "auto",
            color: "#d8b4fe",
            fontSize: "13px",
            border: "1px solid rgba(168, 85, 247, 0.2)"
          }}>
            {JSON.stringify(results.data, null, 2)}
          </pre>
        </div>
      )}

      {/* Demo Payment Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "rgba(23, 15, 38, 0.95)",
            border: "1px solid #c084fc",
            padding: "30px",
            borderRadius: "24px",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(192, 132, 252, 0.3)"
          }}>
            <h2 style={{ color: "#c084fc", marginTop: 0 }}>VIP Pro Access</h2>
            <p style={{ color: "#d8b4fe", fontSize: "14px" }}>Demo Payment Checkout for Pro OSINT Searches</p>
            
            <div style={{
              background: "rgba(10, 3, 20, 0.6)",
              padding: "15px",
              borderRadius: "12px",
              margin: "20px 0",
              border: "1px solid rgba(168, 85, 247, 0.2)"
            }}>
              <p style={{ margin: "5px 0", fontSize: "20px", fontWeight: "bold", color: "#fff" }}>$9.99 / month</p>
              <small style={{ color: "#a855f7" }}>Test Sandbox Mode</small>
            </div>

            <button
              onClick={handleMockPayment}
              disabled={paymentDone}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "10px"
              }}
            >
              {paymentDone ? "Processing..." : "Complete Test Payment"}
            </button>

            <button
              onClick={() => setShowModal(false)}
              style={{
                background: "none",
                border: "none",
                color: "#a855f7",
                cursor: "pointer",
                fontSize: "13px"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
        }
