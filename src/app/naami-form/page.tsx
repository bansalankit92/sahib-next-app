"use client";

import { ImageUpload } from "@/components/ImageUpload";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import styles from "../../styles/Home.module.css";
import ashramLocationsAll from "../../data/asharamLocations.json";
import useMounted from "../../hooks/useMounted";

interface NaamiForm {
  fullName: string;
  profilePic: File;
  address: string;
  email: string;
  city: string;
  country: string;
  state: string;
  pincode: string;
  naamDate: string;
  naamDaanLocation: string;
}

const NaamiForm = () => {
  const history = useRouter();
  const mounted = useMounted();

  const [form, setForm] = useState({
    country: "India",
    state: "MH",
    pincode: "411001",
    address: "Near Andheri",
    city: "Mumbai",
    naamDate: "2015-02-19",
    naamDaanLocation: "Mumbai",
  } as NaamiForm);
  const [asharamLocations, setAsharamLocations] = useState(ashramLocationsAll);
  const [selectedLocation, setSelectedLocation] = useState(
    asharamLocations.find((a) => a.name === form.naamDaanLocation)
  );

  const updateForm = (obj = {}) => setForm({ ...form, ...obj });

  const onSubmit = () => {
    history.push('/')
  };

  return (
    mounted && (
      <div className={styles.container}>
        <div className="min-h-screen p-6 bg-gray-100  items-center justify-center dark:bg-gray-900">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600 dark:text-white">
                Naami Form
              </h2>
              <p className="text-gray-500 mb-6"></p>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                    <ImageUpload
                      onSelect={(e) => updateForm({ profilePic: e })}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <Input
                          label="Full Name"
                          type="text"
                          name="full_name"
                          id="full_name"
                          placeholder="Ankit Bansal"
                          value={form.fullName}
                          onChange={(e) =>
                            updateForm({ fullName: e.target.value })
                          }
                        />
                      </div>

                      <div className="md:col-span-5">
                        <Input
                          label="Email Address"
                          type="text"
                          name="email"
                          id="email"
                          placeholder="email@domain.com"
                          value={form.email}
                          onChange={(e) =>
                            updateForm({ email: e.target.value })
                          }
                        />
                      </div>

                      <div className="md:col-span-3">
                        <Input
                          label=" Current Address"
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Near this building"
                          value={form.address}
                          onChange={(e) =>
                            updateForm({ address: e.target.value })
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Input
                          label="City"
                          type="text"
                          name="city"
                          id="city"
                          placeholder=""
                          value={form.city}
                          onChange={(e) => updateForm({ city: e.target.value })}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Input
                          label="Country"
                          type="text"
                          name="country"
                          id="country"
                          placeholder=""
                          inputType="DROPDOWN"
                          value={form.country}
                          onChange={(e) =>
                            updateForm({ country: e.target.value })
                          }
                          onClickClear={() => updateForm({ country: "" })}
                          disabled
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Input
                          label="State"
                          type="text"
                          name="state"
                          id="state"
                          inputType="DROPDOWN"
                          placeholder=""
                          value={form.state}
                          onChange={(e) =>
                            updateForm({ state: e.target.value })
                          }
                        />
                      </div>

                      <div className="md:col-span-1">
                        <Input
                          label="Pincode"
                          type="number"
                          name="pincode"
                          id="pincode"
                          placeholder="411001"
                          value={form.pincode}
                          onChange={(e) =>
                            updateForm({ pincode: e.target.value })
                          }
                        />
                      </div>

                      {/* <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <Button text="Submit" onClick={() => onSubmit()} />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Naam Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <Input
                          inputType="DATE_PICKER"
                          label="Naam Date"
                          name="naamDate"
                          id="naamDate"
                          placeholder="2015-02-19"
                          dateValue={new Date(form.naamDate)}
                          onDateSelect={(e) =>
                            updateForm({ naamDate: e?.startDate })
                          }
                        />
                      </div>
                      <div className="md:col-span-5">
                        <Input
                          inputType="DROPDOWN"
                          label="Naam Daan Location"
                          name="naamDaanLocation"
                          id="naamDaanLocation"
                          placeholder="Mumbai"
                          dropdownValues={asharamLocations}
                          value={selectedLocation?.label}
                          onClickClear={() =>
                            setAsharamLocations(ashramLocationsAll)
                          }
                          onChange={(e) => {
                            setAsharamLocations(
                              ashramLocationsAll.filter((a) =>
                                a.label.toLowerCase().includes(e.target.value)
                              )
                            );
                          }}
                          onDropdownSelect={(d) => {
                            setSelectedLocation(d);
                            updateForm({ naamDaanLocation: d?.name });
                          }}
                        />
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <Button text="Submit" onClick={() => onSubmit()} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NaamiForm;
