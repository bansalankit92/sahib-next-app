import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-24">
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
        <ol className="list-disc	">
          <p className="text-lg">Steps</p>
          <li>
            Sewa-Samiti can scan the QR code at the entry desk<br/> - and immediately it will get registered in the system.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="text-xl">
          Phase 3 - Automated Room allotment and booking via issued card.
        </h2>
        <ol className="list-disc">
          <p className="text-lg">Steps</p>
          <li>
            Sewa-Samiti will scan the QR code at the entry desk
            <br/> - The system will allot the next available room.
            <br/> - The system will save the id card details of the naami.
          </li>
          <li>
            Benefits: This will help us from the intruders.
            <br/> In case of overbooking we will exactly know each person who is in which room via age and can switch the rooms if required. 
          </li>
        </ol>
      </div>
    </main>
  );
}
