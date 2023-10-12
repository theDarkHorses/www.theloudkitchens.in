import { MapPinIcon, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

<<<<<<< HEAD
export default function Layout({ children, dishes, carousel }) {
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
                    <Image alt="coin" src={"/icons/coin.svg"} width={20} height={20} className="w-5 h-5 aspect-square" />
                    <p className="font-raleway font-semibold text-xs px-1">100</p>
                </div>
            </header>
            <main className="">
                <Link href="/search" className=" mx-5 flex py-2 cursor-pointer px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2">
                    <Search size={20} className="text-primary " />
                    <p className="font-raleway font-semibold text-[#999] text-xs">Search for restaurants, cuisines and more... </p>
                </Link>
                <section className="py-4 bg-[#F9F9F9] mt-4">
                    <header className="flex items-end px-5 space-x-2">
                        <div className="border-t border-[#CCC] flex-1 " />
                        <span className="flex flex-col items-center">
                            <p className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">🔥</p>
                            <p className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">Hottest Arrivals</p>
                        </span>
                        <div className="border-t border-[#CCC] flex-1" />
                    </header>
                    {dishes}
                </section>
                <section className="py-4 bg-[#F6F6F6] mt-4">
                    <header className="flex items-end px-2 space-x-2">
                        <div className="border-t border-[#CCC] flex-1 " />
                        <span className="flex flex-col items-center">
                            <Image alt="discount" src={"/icons/off.png"} width={24} height={24} />
                            <p className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">Offers & Updates</p>
                        </span>
                        <div className="border-t border-[#CCC] flex-1" />
                    </header>
                    {carousel}
                </section>
            </main>
        </>
    )
=======
export default function Layout({ children, dishes, restaurants }) {
  return (
    <>
      <Header />
      <main className="">
        <Link
          href="/search"
          className=" mx-2 flex py-2 cursor-pointer px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2"
        >
          <Search size={20} className="text-[#AC2318] " />
          <p className="font-raleway font-semibold text-[#999] text-xs">
            Search for restaurants, cuisines and more...{" "}
          </p>
        </Link>
        <section className="py-4 bg-[#F9F9F9] mt-2">
            {restaurants}
          <header className="flex items-end px-2 space-x-2">
            <div className="border-t border-[#CCC] flex-1 " />
            <span className="font-medium relative top-2 text-[#888] text-lg font-raleway text-center">
              🔥 <br />
              Hottest Arrivals
            </span>
            <div className="border-t border-[#CCC] flex-1" />
          </header>
          {dishes}
        </section>
      </main>
    </>
  );
>>>>>>> 9e53c3622e04998d5c329a20e69e521b3257e9e3
}
