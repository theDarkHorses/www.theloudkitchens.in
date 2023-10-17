"use client";

import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const options = ["home", "hostel", "work", "other"];

export default function page() {
  const [activeLocation, setActiveLocation] = useState(options[0]);
  const [orderFor, setOrderFor] = useState(options[0]);
  const [simpleFormData, setSimpleFormData] = useState({
    name: "",
    address: "",
    birthday: "",
    landmark: "",
  });
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/address",
      simpleFormData
    );

    console.log("submit", simpleFormData, response);
  };

  return (
    <section className="h-[calc(100vh_-_64px)] no-scrollbar px-4 bg-[#F5F6FB] w-full overflow-hidden overflow-y-scroll py-8">
      <header className="flex items-center space-x-2 mt-5 ">
        <ChevronLeft
          onClick={() => router.back()}
          size={24}
          color="#AC2323"
          className="cursor-pointer"
        />
        <h1 className="font-lato text-xl font-bold text-[#242539]">
          Complete address details
        </h1>
      </header>
      <div className="border mt-10 rounded-lg p-3 py-5 shadow shadow-slate-300  bg-white">
        <p className="text-base font-lato">Who are you ordering for?</p>
        <div className="flex space-x-4 items-center mt-3 ">
          <div className="flex space-x-1 text-sm items-center font-lato text-[#1C1C1C]">
            <input
              name="order"
              value="Myself"
              id="myself"
              type="radio"
              className=" accent-primary"
              onClick={() => setOrderFor("myself")}
            />
            <label htmlFor="myself">Myself</label>
          </div>
          <div className="flex space-x-1 text-sm items-center font-lato text-[#1C1C1C]">
            <input
              name="order"
              value="someoneElse"
              id="someoneElse"
              type="radio"
              className=" accent-primary"
              onClick={() => setOrderFor("someoneElse")}
            />
            <label htmlFor="someoneElse">Someone Else</label>
          </div>
          <div className="flex space-x-1 text-sm font-lato text-[#1C1C1C]">
            <input
              name="order"
              value="someoneSpecial"
              id="someoneSpecial"
              type="radio"
              className=" accent-primary"
              onClick={() => setOrderFor("someoneSpecial")}
            />
            <label htmlFor="someoneSpecial">Someone Special</label>
          </div>
        </div>
        <div className="font-lato text-sm my-10">
          <p className="text-text text-sm">Save address as *</p>
          <div className="w-full mt-2 space-x-2 font-lato text-sm text-[#1C1C1C]">
            {options.map((label) => (
              <button
                type="button"
                key={label}
                onClick={() => setActiveLocation(label)}
                className={`px-3 py-1 border capitalize rounded-lg ${
                  label == activeLocation
                    ? "border-primary bg-red-100"
                    : "border-text"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <form
            onSubmit={submitHandler}
            className="space-y-3 mt-8 flex flex-col font-lato text-sm"
          >
            {orderFor == "someoneSpecial" ? (
              <>
                <input
                  onChange={(e) =>
                    setSimpleFormData({
                      ...simpleFormData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Taste Chaser’s Name"
                  className="py-2 px-2 w-full border rounded-lg outline-none"
                  required
                />
                <input
                  onChange={(e) =>
                    setSimpleFormData({
                      ...simpleFormData,
                      birthday: e.target.value,
                    })
                  }
                  placeholder="TasteChaser’s Birthday"
                  className="py-2 px-2 w-full border rounded-lg outline-none"
                  required
                />
              </>
            ) : (
              <input
                onChange={(e) =>
                  setSimpleFormData({ ...simpleFormData, name: e.target.value })
                }
                placeholder="Recipient’s Name"
                className="py-2 px-2 w-full border rounded-lg outline-none"
                required
              />
            )}
            <input
              onChange={(e) =>
                setSimpleFormData({
                  ...simpleFormData,
                  address: e.target.value,
                })
              }
              placeholder="Room no. /flat no. / Building no."
              className="py-2 px-2 w-full border rounded-lg outline-none"
              required
            />
            <input
              onChange={(e) =>
                setSimpleFormData({
                  ...simpleFormData,
                  landmark: e.target.value,
                })
              }
              placeholder="Nearby landmark (optional)"
              className="py-2 px-2 w-full border rounded-lg outline-none"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white text-lg font-lato text-center w-full py-2 mt-10 rounded-lg"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
