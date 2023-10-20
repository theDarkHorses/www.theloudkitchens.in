"use client"

import { useAuth } from "@clerk/nextjs";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Briefcase, ChevronRight, Home, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"
import { DB, userCollectionRef } from "../firebaseConfig";

export default function AddressOverlay({ openDrawer, setOpenDrawer }) {
  const [address, setAddress] = useState([]);
  const { userId } = useAuth();

  const userCollectionRef = doc(DB, "users", userId);

  useEffect(() => {
    const addressCollectionRef = collection(userCollectionRef, "addresses");
    const unsubscribe = onSnapshot(addressCollectionRef, (snapshot) => {
      const addresses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAddress(addresses);
    });
    return unsubscribe;
  }, [userCollectionRef]);


  return (
    <div className={`bg-transparent transition-all duration-300  absolute top-0 bottom-0 left-0 right-0 h-screen w-screen z-[999999] ${openDrawer ? "translate-y-0" : "translate-y-full"}`}>
      <div className="h-screen w-screen bottom-0 right-0  opacity-[0.77] bg-black fixed top-0 left-0 " onClick={() => setOpenDrawer(false)} />
      <div style={{ height: window.innerHeight * 0.7, boxShadow: " 0px 0px 9px 0px rgba(0, 0, 0, 0.25)" }} onClick={(e) => e.stopPropagation()} className="fixed bg-[#F6F6F6] mt-10   bottom-0 right-0 left-0  w-screen p-4 pt-10  rounded-t-2xl overflow-hidden overflow-y-scroll no-scrollbar">

        <h2 className="font-lato text-xl font-bold text-[#242539]">
          Saved Addresses
        </h2>
        <main className="px-4 py-2 mt-10  rounded-lg divide-y-[1px] shadow shadow-slate-300 bg-white" style={{ boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.20)" }}>
          {address?.map((address, index) => (
            <div
              key={index}
              className="flex py-6 space-x-4 items-start cursor-pointer "
            >
              <div className="flex flex-col items-center">
                {address.location == "home" ? (
                  <Home size={16} className="text-[#18191B]" />
                ) : (
                  <Briefcase size={16} className="text-[#18191B]" />
                )}
                <p className="capitalize text-xs font-lato mt-1 ">
                  {address.location}
                </p>
              </div>
              <div className="">
                <p className="font-lato leading-none text-[#18191B] text-base capitalize">
                  {address.location}
                </p>
                <p className="font-lato mt-1 leading-snug text-xs text-md text-[#777] capitalize">
                  {`${address.name}, ${address.address}, ${address.landmark}.`}
                </p>
                <Link href={`/ address ? edit = ${address.id} `} className="w-fit">
                  <div className="p-1 bg-white w-fit rounded-full mt-3 shadow border shadow-slate-100">
                    <MoreHorizontal className="text-primary " size={16} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
          <Link
            href="/address/new"
            className="flex items-center  pb-4 pt-6 justify-between"
          >
            <div className="items-center flex space-x-2">
              <Plus size={24} className="text-primary" />
              <p className="font-lato text-primary text-md">Add Address</p>
            </div>
            <ChevronRight size={20} className="text-primary" />
          </Link>
        </main>

      </div>
    </div>

  )
}
