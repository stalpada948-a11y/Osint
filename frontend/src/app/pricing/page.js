import Navbar from '@/components/Navbar';

export default function Pricing() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1e0b36 0%, #0a0314 100%)",
      color: "#f3e8ff",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Navbar />
      <h1 style={{ color: "#c084fc" }}>VIP Pro Memberships</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        
        {/* Starter Plan */}
        <div style={{
          background: "rgba(23, 15, 38, 0.6)",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          width: "250px"
        }}>
          <h3>Free Tier</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>$0 / mo</p>
          <p style={{ fontSize: "13px", color: "#a855f7" }}>Basic domain & email searches.</p>
        </div>

        {/* Pro Plan */}
        <div style={{
          background: "rgba(168, 85, 247, 0.15)",
          padding: "25px",
          borderRadius: "16px",
          border: "2px solid #c084fc",
          width: "250px"
        }}>
          <h3 style={{ color: "#c084fc" }}>Pro Max</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>$9.99 / mo</p>
          <p style={{ fontSize: "13px", color: "#d8b4fe" }}>Unlimited requests & deep analytics.</p>
          <button style={{
            width: "100%",
            padding: "10px",
            background: "#a855f7",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            marginTop: "10px"
          }}>Subscribe Demo</button>
        </div>

      </div>
    </div>
  );
}

