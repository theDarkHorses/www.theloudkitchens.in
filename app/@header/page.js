import React from "react";
import { ArrowLeftCircle, MapPinIcon,Search } from "lucide-react";
import coin from "../../public/icons/coin.svg"
import Image from "next/image";

export default function page() {
  return (
    <section className="h-24 mt-14 px-3 flex flex-col justify-between">
      <section className=" flex items-center justify-between">
        <div className="flex">
          <div className="text-[#AC2323] bg-[#D9D9D9] p-2 rounded-full">
            <MapPinIcon size={24} />
          </div>
          <div className="flex flex-col justify-center pl-1">
            <p className="font-raleway text-sm font-bold">Nit Srinagar</p>
            <p className="text-[#555] font-lato text-xs leading-[0.5]">Room- 323 </p>
          </div>
        </div>
        <div className="flex rounded-lg border-2 px-2 py-1">
          <Image src={coin} className=""/>
          <p className="font-raleway font-semibold text-xs px-1">100</p>
        </div>
      </section>
      <section className="flex py-2 px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2">
        <Search size={20} className="text-[#AC2318] "/>
        <p className="font-raleway font-semibold text-[#999] text-xs">Search for restaurants, cuisines and more... </p>
      </section>
    </section>
  );
}
