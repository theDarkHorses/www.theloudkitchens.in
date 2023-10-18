import { ChevronLeft } from "lucide-react";
import React from "react";
import CouponCard from "../components/CouponCard";

const layout = () => {
  return (
    <div>
      <header className="bg-white rounded-b-2xl shadow-md flex flex-col px-5">
        <div className="flex items-start space-x-3 pt-12 mb-8">
          <ChevronLeft size={20} className="mt-1" />
          <div className="">
            <p className="font-lato text-xl font-bold">Coupons</p>
            <p className="font-lato text-[#888] text-xs font-bold">
              CartValue: ₹440
            </p>
          </div>
        </div>
        <form className="relative pb-5">
          <input
            className="font-lato  placeholder:text[#949494] py-3 pl-4 border rounded-xl w-full"
            placeholder="Enter your code here"
            type="text"
          />
          <button className="absolute top-4 right-4 font-lato text-[#C2C2C2]">
            Apply
          </button>
        </form>
      </header>
      <main className="px-5 py-12 space-y-10">
        <CouponCard />
        <CouponCard />
        <CouponCard />
      </main>
    </div>
  );
};

export default layout;
