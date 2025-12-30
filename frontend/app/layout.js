import './globals.css'

export const metadata = {
  title: 'ATS Careers',
  description: 'Find your next opportunity',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
