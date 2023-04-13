import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2 className="text-xl">
          Phase 1 - Create S.B. Naami card (Collect and build data)
        </h2>
        <ol className="list-decimal	">
          <p className="text-lg">Steps</p>
          <li>
            <Link href="/naami-form">
              Naami - Fill form with name, contact number, pic, naam daan
              address.
            </Link>
          </li>
          <li>
            <Link href="/admin-login">
              Sewa Samiti - Will verify the naami details and approve it.
            </Link>
          </li>
          <li>
            <Link href="/naami-card">
              Naami - After approval, naami can download the sb card and print
              it.
            </Link>
          </li>
        </ol>
      </div>

      <div>
        <h2 className="text-xl">
          Phase 2 - Security check + check daily foot fall.
        </h2>
        <ol className="list-decimal	">
          <p className="text-lg">Steps</p>
          <li>
            {" "}
            Naami - Fill form with name, contact number, pic, naam daan address.
          </li>
          <li>Sewa Samiti - Will verify the naami details and approve it.</li>
          <li>
            Naami - After approval, naami can download the sb card and print it.
          </li>
        </ol>
      </div>
    </main>
  );
}
