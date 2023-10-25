import { auth } from "@clerk/nextjs";
import { collection, doc, getDocs } from "firebase/firestore";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Home,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { userCollectionRef } from "../firebaseConfig";



async function getAddresses(userId) {
  const addressCollectionRef = collection(
    doc(userCollectionRef, userId),
    "addresses"
  );
  const savedAddresses = await getDocs(addressCollectionRef);
  return savedAddresses.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}



export default async function page() {
  const { userId } = auth()
  const addresses = await getAddresses(userId);
  return (
    <section className="h-[calc(100vh_-_64px)] no-scrollbar px-4 bg-[#F5F6FB] w-full overflow-hidden overflow-y-scroll py-8">
      <header className="flex items-center space-x-2 mt-5 ">
        <Link href="/home">
          <ChevronLeft size={24} color="#AC2323" />
        </Link>
        <h1 className="font-lato text-xl font-bold text-[#242539]">
          Add location
        </h1>
      </header>
      <main className=" mt-10">
        {/* <section className="border rounded-lg p-3 shadow shadow-slate-300 flex items-center justify-between bg-white">
          <main className="flex items-center space-x-4 ">
            <LocateFixed size={24} className="text-primary" />
            <div className=" font-lato text-sm">
              <p className="text-primary">Use your current location</p>
              <p className="text-[#18191B] text-xs">Hazratbal, Srinagar</p>
            </div>
          </main>
          <ChevronRight size={24} color="gray" className="ml-auto" />
        </section> */}
        <section className="mt-10 space-y-4">
          <h2 className="font-lato text-lg font-bold text-[#242539]">
            Saved Addresses
          </h2>
          <main className="px-4 py-2 rounded-lg divide-y-[1px] shadow shadow-slate-300 bg-white">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="flex py-6 space-x-4 items-start "
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
                  <Link href={`/address?edit=${address.id}`} className="w-fit">
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
        </section>
      </main>
    </section>
  );
}
