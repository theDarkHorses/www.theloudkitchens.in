"use client"

import { useAuth } from "@clerk/nextjs";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { Briefcase, ChevronRight, Home, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"
import { DB } from "../firebaseConfig";

export default function AddressOverlay({ openDrawer, setOpenDrawer }) {
  const [address, setAddress] = useState([]);
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
 

  const userCollectionRef = doc(DB, "users", userId);

  useEffect(() => {
    const addressCollectionRef = collection(userCollectionRef, "addresses");
    const unsubscribe = onSnapshot(addressCollectionRef, (snapshot) => {
      const addresses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAddress(addresses);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
      const user = snapshot.data();
      setUser(user);
    }
    );
    return unsubscribe;
  }, [address]);


  const handleSetSelectedAddress = async (address) => {
    try {
      await setDoc(userCollectionRef, { selectedAddress: address }, { merge: true });
      console.log("Address set successfully");
    } catch (err) {
      console.log(err.message)
    }
  }

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
              onClick={() => handleSetSelectedAddress(address)}
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
                {user?.selectedAddress?.id === address.id  && <p className="font-lato border border-primary mb-4 rounded-lg text-[#AC232390]  inline px-2 py-1 text-sm capitalize">
                  Selected
                </p>}
                <p className="font-lato  text-[#18191B] text-base capitalize">
                  {address.location}
                </p>
                <p className="font-lato mt-1 leading-snug text-xs text-md text-[#777] capitalize">
                  {`${address.name}, ${address.address}, ${address.landmark}.`}
                </p>

                <div className="p-1 bg-white w-fit rounded-full mt-3 shadow border shadow-slate-100">
                  <MoreHorizontal className="text-primary " size={16} />
                </div>

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
