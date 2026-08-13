import Navbar from '@/components/Navbar';

export default function Features() {
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
        <h2 style={{ color: "#c084fc" }}>Engine Capabilities</h2>
        <ul style={{ lineHeight: "1.8", color: "#d8b4fe" }}>
          <li>**Email Footprint:** Multi-platform social footprint mapping.</li>
          <li>**Domain WHOIS:** DNS, NameServer, aur domain registrar details.</li>
          <li>**IP Geolocation:** Network routing aur hosting info.</li>
          <li>**Real-time Analytics:** Speed-optimized JSON response engine.</li>
        </ul>
      </div>
    </div>
  );
  }

