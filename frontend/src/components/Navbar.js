import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justify: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "900px",
      padding: "15px 25px",
      marginBottom: "30px",
      background: "rgba(23, 15, 38, 0.7)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      border: "1px solid rgba(168, 85, 247, 0.3)"
    }}>
      <div style={{ fontWeight: "800", color: "#c084fc", fontSize: "18px" }}>
        ⚡ RECON MAX
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/" style={{ color: "#f3e8ff", textDecoration: "none", fontSize: "14px" }}>Home</Link>
        <Link href="/features" style={{ color: "#f3e8ff", textDecoration: "none", fontSize: "14px" }}>Features</Link>
        <Link href="/dashboard" style={{ color: "#f3e8ff", textDecoration: "none", fontSize: "14px" }}>Dashboard</Link>
        <Link href="/pricing" style={{ color: "#c084fc", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>VIP Plans</Link>
      </div>
    </nav>
  );
          }

