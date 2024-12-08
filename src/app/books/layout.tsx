"use client";

import Drawer from "@/components/Drawer";
import { APP_PATHS } from "@/services/AppConstants";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// export const metadata = {
//   title: 'Sahibji Satsang and Bhajans (UnOfficial)',
//   description: 'This is unofficial sahibji satsang and audio bhajan website.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <body className="lg:container mx-auto px-4 sm:px-2">
        <div className="absolute top-4 left-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
            onClick={()=> setIsOpen(true)}
          >
            Menu
          </button>
        </div>

        {children}

        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href={APP_PATHS.CHALISA}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
              
                  <span className="ms-3">Chalisa</span>
                </Link>
              </li>
              <li>
                <Link
                  href={APP_PATHS.AARTI1}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
              
                  <span className="ms-3">Aarti 1</span>
                </Link>
              </li>
              <li>
                <Link
                  href={APP_PATHS.AARTI2}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
              
                  <span className="ms-3">Aarti 2</span>
                </Link>
              </li>
            </ul>
          </div>
      </Drawer>

  
      </body>
    </html>
  );
}
