"use client";

import Drawer from "@/components/Drawer";
import { APP_PATHS } from "@/services/AppConstants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// This is a nested layout for the books section
// It should not contain html/body tags as those are handled by the root layout

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Changed to false to start closed

  return (
    <>
      <div className="absolute top-4 left-4 z-50">
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
                href={APP_PATHS.SATSANG}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Home</span>
              </Link>
            </li>
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
    </>
  );
}
