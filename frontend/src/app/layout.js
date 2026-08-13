import Navbar from "@/components/Navbar";

export const metadata = {
  title: "OSINT RECON PORTAL MAX",
  description: "Universal Footprint, WHOIS, Breach & Social Recon Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0314", color: "#f3e8ff" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
