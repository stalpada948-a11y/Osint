export const metadata = {
  title: 'OSINT Tool',
  description: 'OSINT Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

