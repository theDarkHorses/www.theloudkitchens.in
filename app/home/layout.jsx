import { MapPinIcon, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import endnotes from "../../public/icons/endnote.svg";
export default function Layout({ children, dishes, carousel, restaurants }) {
  return (
    <>
      <header className="py-4 bg-[#f5f5f5] pt-14  top-0 px-5 flex  items-center justify-between">
        <div className="flex space-x-2">
          <div className="text-primary bg-[#D9D9D9] p-2 rounded-full">
            <MapPinIcon size={24} />
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-raleway text-sm font-bold">Nit Srinagar</p>
            <p className="text-[#555] font-lato text-xs ">Room- 323 </p>
          </div>
        </div>
        <div className="flex rounded-lg border-[#DDD] items-center border-2 h-fit px-2 py-1">
          <Image
            alt="coin"
            src={"/icons/coin.svg"}
            width={20}
            height={20}
            className="w-5 h-5 aspect-square"
          />
          <p className="font-raleway font-semibold text-xs px-1">100</p>
        </div>
      </header>
      <main className="">
        <Link
          href="/search"
          className=" mx-5 flex py-2 cursor-pointer px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2"
        >
          <Search size={20} className="text-primary " />
          <p className="font-raleway font-semibold text-[#999] text-xs">
            Search for restaurants, cuisines and more...{" "}
          </p>
        </Link>
        <section className="mt-8 space-y-2">
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
        <section className="py-4 bg-[#F9F9F9] mt-4">
          <header className="flex items-end px-5 space-x-2">
            <div className="border-t border-[#CCC] flex-1 " />
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
          <header className="flex items-end px-2 space-x-2">
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
        <section className="">
          <Image
            src={endnotes}
            height={110}
            width={204}
            alt="end notes"
            className="py-8 mx-2"
          />
          <div className="text-[#BDBDBD] mt-24 mb-10">
            <div className="relative border-t border-[#CCC] flex-1 border-dashed" />
            <div className="max-w-[50vw] -m-6 mx-auto text-center bg-[#f4f4f4] relative z-10">
              Proudly made in <br />
              NIT Srinagar
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
