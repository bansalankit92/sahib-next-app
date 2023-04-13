"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Home.module.css";

export default function Login() {
  const history = useRouter();

  const onSignIn = () => {
    history.push("/naami-card-approve");
  };

  return (
    <div className={styles.container}>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="md:mt-0 sm:max-w-md flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img
            className="w-screen"
            src="http://sahibbandgi.org/images/Satya%20Sahib%20Bandgi%20logo%20-%20EN.png"
            alt="logo"
          /> */}
          </a>
          <div>Demo Sahib B</div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sewa Samiti Admin login
              </h1>
              <div className="space-y-4 md:space-y-6">
                <Input
                  label="Email Id"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button text="Sign In" onClick={() => onSignIn()} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// export default login;
