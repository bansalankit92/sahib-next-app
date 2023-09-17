import './globals.css'
import Head from "next/head";

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
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png"></link>
    </Head>
      <body className="lg:container mx-auto px-4 sm:px-2">{children}</body>
    </html>
  )
}
