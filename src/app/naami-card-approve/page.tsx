"use client";

import useMounted from "@/hooks/useMounted";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Button, { ButtonColors } from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Home.module.css";

export default function Login() {
  const history = useRouter();
  const mounted = useMounted();
  const onSignIn = () => {
    // history.push('/naami-card-approve')
  };

  return (
    mounted && (
      <div className={styles.container}>
        <div className="min-h-screen p-6 bg-gray-100  items-center justify-center dark:bg-gray-900">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600 dark:text-white">
                Welcome Atreji,
              </h2>
              <p className="text-gray-500 mb-6">
                Please approve the card of naamis
              </p>

              <div className="">
                <table className="border-collapse table-fixed min-w-full text-left dark:text-white ">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th></th>
                      <th>Naami Details</th>
                      <th>Approve</th>
                      <th>Later</th>
                      <th>Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td width="15%">
                        <img
                          src="/images/pexels-photo-614810.webp"
                          alt="tailwind logo"
                          className="rounded-full max-w-[50%]"
                        />
                      </td>
                      <td>
                        <p className="">
                          <span className="font-bold "> Name:</span>{" "}
                          <span className="">Ram Demo</span>
                        </p>
                        <p className="">
                          <span className="font-bold  "> Address:</span> Ayodhya:
                          412101, MH, IN
                        </p>
                        <p className="">
                          <span className="font-bold  "> Naam Daan:</span>{" "}
                          Mumbai, 19 Feb 2015
                        </p>
                      </td>
                      <td>
                        <Link href="/naami-card"><Button text="Approve" type={ButtonColors.SUCCESS} /></Link>
                      </td>
                      <td>
                        <Button text="Later" type={ButtonColors.WARNING} />
                      </td>
                      <td>
                        <Button text="Reject" type={ButtonColors.DANGER} />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td width="15%">
                        <img
                          src="/images/pexels-photo-2379004.jpeg"
                          alt="tailwind logo"
                          className="rounded-full max-w-[50%]"
                        />
                      </td>
                      <td>
                        <p className="">
                          <span className="font-bold "> Name:</span>{" "}
                          <span className="">Sample Kumar</span>
                        </p>
                        <p className="">
                          <span className="font-bold  "> Address:</span> Patna:
                          612101, BH, PT
                        </p>
                        <p className="">
                          <span className="font-bold  "> Naam Daan:</span>{" "}
                          Mumbai, 19 Feb 2015
                        </p>
                      </td>
                      <td>
                        <Link href="/naami-card"><Button text="Approve" type={ButtonColors.SUCCESS} /></Link>
                      </td>
                      <td>
                        <Button text="Later" type={ButtonColors.WARNING} />
                      </td>
                      <td>
                        <Button text="Reject" type={ButtonColors.DANGER} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
