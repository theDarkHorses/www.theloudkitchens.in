import { ChevronRight, MapPinIcon, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import endnotes from "../../public/icons/endnote.svg";

export default async function Layout({ dishes, carousel, restaurants }) {
  return (
    <>
      <header className="py-4 bg-white pt-10  top-0 px-5 flex  items-center justify-between">
        <Link href="/address" className="flex space-x-2">
          <div className="text-primary bg-[#f2f2f2] p-2 rounded-full">
            <MapPinIcon size={24} />
          </div>
          <div className="flex flex-col justify-center ">
            <div className="flex  items-center">
              <span className="font-raleway text-sm font-bold">
                Nit Srinagar
              </span>
              <ChevronRight size={14} color="#AC2318" />
            </div>
            <p className="text-[#555] font-lato text-xs ">Room- 323 </p>
          </div>
        </Link>
        <Link
          href="/orders?tab=2"
          className="flex rounded-lg border-[#DDD] items-center border-2 h-fit px-2 py-1"
        >
          <Image
            alt="coin"
            src={"/icons/coin.svg"}
            width={20}
            height={20}
            className="w-5 h-5 aspect-square"
          />
          <p className="font-raleway font-semibold text-xs px-1">100</p>
        </Link>
      </header>
      <main className="">
        <div className="bg-white px-5 pb-6">
          <Link
            href="/search"
            className=" flex py-2 cursor-pointer px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2"
          >
            <Search size={20} className="text-primary " />
            <p className="font-raleway font-semibold text-[#999] text-xs">
              Search for restaurants, cuisines and more...
            </p>
          </Link>
        </div>
        <section className=" mt-4 space-y-2">
          <header className="flex justify-between mx-5">
            <h2 className="font-raleway font-bold text-[#555]">
              Select Restaurant
            </h2>
            <Link
              href="/"
              className="text-[#AC2323] space-x-2 flex font-lato text-sm items-center font-semibold border-l-2 border-[#AC2323]"
            >
              <span className="pl-2">See all</span>
              <Image
                src={"/icons/seeall.svg"}
                height={10}
                width={10}
                alt="seeall"
                className=" aspect-square"
              />
            </Link>
          </header>
          {restaurants}
        </section>
        <section className="bg-[#F4F4F4]">
          <header className="flex items-end px-5 space-x-2 pb-8">
            <div className="border-t border-[#CCC] flex-1" />
            <span className="flex flex-col items-center">
              <p className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">
                🔥
              </p>
              <p className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">
                Hottest Arrivals
              </p>
            </span>
            <div className="border-t border-[#CCC] flex-1" />
          </header>
          {dishes}
        </section>
        <section className="py-4 bg-[#F6F6F6] mt-4">
          <header className="flex items-end px-5 space-x-2">
            <div className="border-t border-[#CCC] flex-1 " />
            <span className="flex flex-col items-center">
              <Image
                alt="discount"
                src={"/icons/off.png"}
                width={24}
                height={24}
              />
              <p className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">
                Offers & Updates
              </p>
            </span>
            <div className="border-t border-[#CCC] flex-1" />
          </header>
          {carousel}
        </section>
        <section className="px-5 bg-white py-8">
          <Image
            src={endnotes}
            height={110}
            width={204}
            alt="end notes"
            className="py-8 mx-2"
          />
          <div className="text-[#BDBDBD] items-center py-10 space-x-2 flex">
            <div className=" border-t  border-[#CCC] flex-1 border-dashed" />
            <div className="mx-auto text-center  w-36 flex flex-col leading-tight">
              Proudly made in NIT Srinagar
            </div>
            <div className="relative border-t  border-[#CCC] flex-1 border-dashed" />
          </div>
        </section>
      </main>
    </>
  );
}
