"use client";

import './globals.css'
import Head from "next/head";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { APP_PATHS } from '@/services/AppConstants';
import BottomNavigation from "@/components/BottomNavigation";

// Note: Since this is a client component, we'll use Head component for metadata
// For static metadata, we would export metadata object from a server component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();

  return (
    <html lang="en">

    <Head>
      <title>Sahibji Satsang and Bhajans (UnOfficial)</title>
      <meta name="description" content="This is unofficial sahibji satsang and audio bhajan website." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png"></link>
    </Head>
      <body className="lg:container mx-auto px-4 sm:px-2">
          {children}
          <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />


<BottomNavigation />

      </body>

    </html>
  )
}
