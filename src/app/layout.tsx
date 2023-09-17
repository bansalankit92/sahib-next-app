import './globals.css'

export const metadata = {
  title: 'Sahibji Satsang and Bhajans (UnOfficial)',
  description: 'This is unofficial sahibji satsang and audio bhajan website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
