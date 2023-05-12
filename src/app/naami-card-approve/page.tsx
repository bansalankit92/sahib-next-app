"use client";

import useMounted from "@/hooks/useMounted";
import { Admin } from "@/models/Admin";
import { Naami } from "@/models/Naami";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button, { ButtonColors } from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Home.module.css";
import { adminLogin, getNaamiList } from "../services/in-memory-db";

export default function Login() {
  const history = useRouter();
  const mounted = useMounted();

  const [naamiList, setNaamiList] = useState<Naami[]>([])
  const [admin, setAdmin] = useState<Admin>()

  const onSignIn = () => {
    // history.push('/naami-card-approve')
  };

  useEffect(() => {
    const list = getNaamiList();
    const admin = adminLogin();
    console.log('naami list',list);
    setAdmin(admin);
    setNaamiList(list);
    
    
  }, [])
  

  return (
    mounted && (
      <div className={styles.container}>
        <div className="min-h-screen p-6 bg-gray-100  items-center justify-center dark:bg-gray-900">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600 dark:text-white">
                Welcome {admin?.name},
              </h2>
              <p className="text-gray-500 mb-6">
                Please verify the naamis.
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
                    {
                      naamiList?.map(x=>(
                        <tr className="border-b" key={x.id}>
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
                            <span className="">{x.fullName}</span>
                          </p>
                          <p className="">
                            <span className="font-bold  "> Address:</span> {x.address}, {x.city},{x.state}, {x.country}
                          </p>
                          <p className="">
                            <span className="font-bold  "> Naam Daan:</span>{" "}
                            {x.naamDaanLocation}, {x.naamDate}
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
                      ))
                    }
                   
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
