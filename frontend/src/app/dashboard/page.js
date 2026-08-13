import Navbar from '@/components/Navbar';

export default function Dashboard() {
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
      <div style={{
        maxWidth: "800px",
        width: "100%",
        background: "rgba(23, 15, 38, 0.6)",
        padding: "30px",
        borderRadius: "20px",
        border: "1px solid rgba(168, 85, 247, 0.3)"
      }}>
        <h2 style={{ color: "#c084fc" }}>Recent Activity Logs</h2>
        <table style={{ width: "100%", textAlign: "left", marginTop: "15px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(168, 85, 247, 0.4)", color: "#a855f7" }}>
              <th style={{ padding: "10px" }}>Target</th>
              <th style={{ padding: "10px" }}>Type</th>
              <th style={{ padding: "10px" }}>Status</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px", color: "#d8b4fe" }}>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "10px" }}>xo23.onlyone</td>
              <td style={{ padding: "10px" }}>DOMAIN</td>
              <td style={{ padding: "10px", color: "#f87171" }}>Failed</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>ktalpada484@gmail.com</td>
              <td style={{ padding: "10px" }}>EMAIL</td>
              <td style={{ padding: "10px", color: "#4ade80" }}>Success</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

