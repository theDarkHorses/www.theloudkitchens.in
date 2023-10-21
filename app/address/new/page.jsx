"use client";

import { userCollectionRef } from "@/app/firebaseConfig";
import { useAuth } from "@clerk/nextjs";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"

const orderForOptions = ["Myself", "Someone Else", "Someone special"];
const locationOptions = ["home", "hostel", "work", "other"];



export default function page() {
  const router = useRouter()
  const { userId } = useAuth()
  const [orderFor, setOrderFor] = useState(orderForOptions[0]);
  const [location, setLocation] = useState(locationOptions[0]);
  const [address, setAddress] = useState({ name: "", address: "", landmark: "", birthday: "", orderFor: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userDocRef = doc(userCollectionRef, userId)
      const userAddressCollectionRef = collection(userDocRef, "addresses")
      const newUserId = uuid()
      const newAddress = { id: newUserId, ...address, location, orderFor }
      await setDoc(doc(userAddressCollectionRef, newUserId), newAddress)
      const user = await getDoc(userDocRef)
      if (user.exists() && !user.get("selectedAddress")) {
        await setDoc(userDocRef, { selectedAddress: newAddress }, { merge: true })
      }

    } catch (err) {
      console.log(err.message)
    }
    router.push("/address")
    router.refresh()

  }
  return (
    <section className="h-[calc(100vh_-_64px)] no-scrollbar px-4 bg-[#F5F6FB] w-full overflow-hidden overflow-y-scroll py-8">
      <header className="flex items-center space-x-2 mt-5 ">
        <Link href="/address">
          <ChevronLeft
            size={24}
            color="#AC2323"
            className="cursor-pointer"
          />
        </Link>
        <h1 className="font-lato text-xl font-bold text-[#242539]">
          Complete address details
        </h1>
      </header>

      <main className="border mt-10 rounded-lg p-3 py-5 shadow shadow-slate-300  bg-white">
        <p className="text-base font-lato text-[#1C1C1CCC]">Who are you ordering for?</p>
        <div className="flex space-x-4 items-center mt-3 ">

          {orderForOptions.map((option, index) => (
            <div key={option} className="flex space-x-1 text-sm items-center font-lato text-[#1C1C1C]">
              <input
                name="orderFor"
                value={option}
                id={option}
                checked={orderFor == option}
                type="radio"
                className=" accent-primary"
                onChange={(e) => setOrderFor(e.target.value)}
              />
              <label className="capitalize" htmlFor={option}>{option}</label>
            </div>
          ))}

        </div>
        <div className="font-lato text-sm  mt-5">
          <p className="text-text text-sm">Save address as *</p>
          <div className="w-full flex mt-2 space-x-2 font-lato text-sm text-[#1C1C1C]">
            {locationOptions.map((label) => (
              <div key={label} onClick={() => setLocation(label)} className={`flex space-x-1 text-sm items-center font-lato px-2 py-1 border rounded-lg text-[#1C1C1C] ${location == label ? "border-primary bg-[#AC23231A]" : "border-[#999]"}`}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 mt-8 flex flex-col font-lato text-sm"
        >
          {orderFor == "Someone special" ? (
            <>
              <input
                onChange={(e) =>
                  setAddress({
                    ...address,
                    name: e.target.value,
                  })
                }
                value={address.name}
                placeholder="Taste Chaser’s Name"
                className="py-2 px-2 w-full border rounded-lg outline-none"
                required
              />
              <input
                onChange={(e) =>
                  setAddress({
                    ...address,
                    birthday: e.target.value,
                  })
                }
                value={address.birthday}
                placeholder="TasteChaser’s Birthday"
                className="py-2 px-2 w-full border rounded-lg outline-none"
                required
              />
            </>
          ) : (
            <input
              onChange={(e) =>
                setAddress({ ...address, name: e.target.value })
              }
              value={address.name}
              placeholder="Recipient’s Name"
              className="py-2 px-2 w-full border rounded-lg outline-none"
              required
            />
          )}
          <input
            onChange={(e) =>
              setAddress({
                ...address,
                address: e.target.value,
              })
            }
            value={address.address}
            placeholder="Room no. /flat no. / Building no."
            className="py-2 px-2 w-full border rounded-lg outline-none"
            required
          />
          <input
            onChange={(e) =>
              setAddress({
                ...address,
                landmark: e.target.value,
              })
            }
            value={address.landmark}
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
      </main>

    </section>
  )
}
