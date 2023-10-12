import { Search } from "lucide-react";
import Header from "../components/Header";
import Link from "next/link";

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
}
