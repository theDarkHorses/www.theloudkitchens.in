"use client"

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DATA = [
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
]


export default function page() {
  const [query, setQuery] = useState(null)
  const router = useRouter()
  const searchRef = useRef()

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  return (
    <section className="px-5 h-[calc(100vh_-_64px)] bg-white  w-full overflow-hidden z-40">
      <header className="border rounded-lg  flex items-center py-2 px-2 mt-10 bg-white  shadow-md shadow-slate-200">
        <ChevronLeft size={24} color="#AC2323" onClick={() => router.back()} className="cursor-pointer" />
        <input ref={searchRef} className=" px-2 leading-none font-lato  text-base w-full h-full border-none outline-none" placeholder="Search...." value={query} onChange={(e) => setQuery(e.target.value)} />
      </header>
      <main className="mt-3">
        <h1 className="uppercase  font-semibold pl-4 mt-10 font-lato  text-[#565D67] text-base">POPULAR ITEMS</h1>
        <div className="mt-4 ">
          {DATA.map((item, index) =>
            <div key={index} className="flex p-2 gap-2">
              <Image src={item.photoUrl} alt={item.name} width={52} height={52} />
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[#292C35] font-medium text-start font-lato text-lg ">
                  {item.name}
                </h3>
                <p className="font-lato text-xs font-medium text-[#A1A5A8] leading-none">
                  {item.restaurant}
                </p>
              </div>
            </div>)}
        </div>
      </main>
    </section>
  )
}
