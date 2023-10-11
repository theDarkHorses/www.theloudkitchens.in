import { Play, Search } from "lucide-react";
import Link from "next/link";
import RestaurantIcon from "./components/RestaurantIcon";

export default function Home() {
  return (
    <>
      <section className="flex py-2 px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2">
        <Search size={20} className="text-[#AC2318] " />
        <p className="font-raleway font-semibold text-[#999] text-xs">
          Search for restaurants, cuisines and more...{" "}
        </p>
      </section>

      <section className="flex items-center justify-between pt-8">
        <h2 className="font-raleway font-bold text-[#555]">
          Select Restaurant
        </h2>
        <Link
          href="/"
          className="flex text-[#AC2323] px-2 border-l-2 border-[#AC2323] space-x-2"
        >
          <p className="text-xs font-lato font-semibold">See all</p>
          <Play size={15} />
        </Link>
      </section>

      <RestaurantIcon/>

    </>
  );
}
