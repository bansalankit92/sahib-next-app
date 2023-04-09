"use client";

import React from "react";
import styles from "../../styles/Home.module.css";

export default function Login() {
  
  return (
    <div className={styles.container}>
      <section className="bg-gray-50 dark:bg-gray-900">

        <div className="mt-16  md:space-x-5 space-y-0 rounded-xl shadow-lg p-3 max-w-lg mx-auto border border-white bg-white ">
          <div className="  max-w-screen-lg mx-auto flex justify-center item-center">
            <img
              className="max-w-[30%]"
              src="http://sahibbandgi.org/images/Satya%20Sahib%20Bandgi%20logo%20-%20EN.png"
              alt="logo"
            />
          </div>
          <div className="relative flex flex-row">
            <div className="w-1/5 bg-white mt-8">
              <img
                src="http://ankitbansal.co.in/jpg/ankit2.jpeg"
                alt="tailwind logo"
                className="rounded-full"
              />
            </div>
            <div className="w-3/5 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center"></div>
              <div className="ml-4">
                <p className="text-black">
                  <span className="font-bold text-black"> Name:</span>{" "}
                  <span className="">Ankit Bansal</span>
                </p>
                <p className="text-black">
                  <span className="font-bold text-black "> Address:</span> Pune:
                  412101,
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
