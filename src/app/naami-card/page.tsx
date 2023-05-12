"use client";

import React from "react";
import styles from "../../styles/Home.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <section className="">
        <div className="mt-16  md:space-x-5 space-y-0 rounded-xl shadow-lg p-3 max-w-lg mx-auto border border-white  bg-white">
          <div className="  max-w-screen-lg mx-auto flex justify-center item-center">
            <img
              className="max-w-[30%]"
              src="/images/Satya Sahib Bandgi logo - EN.png"
              alt="logo"
            />
          </div>
          <div className="relative flex flex-row">
            <div className="w-1/5 bg-white mt-8">
              <img
                src="/images/pexels-photo-614810.webp"
                alt="tailwind logo"
                className="rounded-full"
              />
            </div>
            <div className="w-3/5 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center"></div>
              <div className="ml-4">
                <p className="text-black">
                  <span className="font-bold text-black"> Name:</span>{" "}
                  <span className="">Shri Raam Demo</span>
                </p>
                <p className="text-black">
                  <span className="font-bold text-black "> Address:</span> Ayodhya:
                  411001,
                  <br /> MH, IN
                </p>
                <p className="text-black">
                  <span className="font-bold text-black "> Naam Daan:</span>{" "}
                  Mumbai,
                  <br /> 19 Feb 2015
                </p>
              </div>
              <div className="flex justify-center item-center mt-4">
                <h3 className="font-black text-gray-800 text-xl">SB123980</h3>
              </div>
            </div>
            <div className="w-1/5 bg-white grid place-items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png"
                alt="qr code"
                className=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// export default login;
