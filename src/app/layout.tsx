"use client";

import './globals.css'
import Head from "next/head";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useRouter } from 'next/navigation';
import { APP_PATHS } from '@/services/AppConstants';
import BottomNavigation from "@/components/BottomNavigation";

// export const metadata = {
//   title: 'Sahibji Satsang and Bhajans (UnOfficial)',
//   description: 'This is unofficial sahibji satsang and audio bhajan website.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();

  return (
    <html lang="en">

    <Head>
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
