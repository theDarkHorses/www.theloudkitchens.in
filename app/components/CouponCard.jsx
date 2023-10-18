"use client";
import { ChevronRightIcon } from "lucide-react";
import offer from "../../public/icons/offer2.png";
import tick from "../../public/icons/dtick.svg";
import React, { useState } from "react";
import Image from "next/image";

const CouponCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#ccc]">
      <Image
        src={offer}
        height={44}
        width={44}
        className={`relative -top-6 ${isOpen?"left-2/4":"left-3"}`}
        alt="offer"
      />
      <div className="relative -top-4 space-y-8 px-9">
        <h4 className="font-lato font-bold text-[#1C1C1C]">
          60% OFF up to ₹69.420{" "}
        </h4>
        <div className="font-lato text-primary text-xs font-bold flex justify-between items-center ">
          <div className="border rounded px-3 py-1">First5</div>
          <div className="flex space-x-1 items-center">
            More <ChevronRightIcon size={16} className="rotate-90" />
          </div>
        </div>
      </div>
      {/* Information */}

      <div
        className={`${
          isOpen
            ? "mx-4 border-t border-dashed"
            : "mx-4 border-t border-dashed h-0 hidden"
        }`}
      >
        <ul className="py-5 text-[#636989CC] font-lato text-xs font-bold list-disc px-3">
          <li className="">offer applicable on min. cart value of ₹69.420 </li>
          <li className="">offer valid till 18th dec 2023</li>
          <li className="">Valid once per user</li>
        </ul>
      </div>
      <div
        className="border-dashed bg-[#ececec] py-2 border-[#9BA1C1] border-t-[1px] flex items-center justify-center rounded-b-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <div className="flex items-center justify-center">
            <Image src={tick} height={14} width={24} alt="tick" className="" />
            <h4 className="font-lato text-blue-700 font-bold">Applied</h4>
          </div>
        ) : (
          <h4 className="font-lato text-primary font-bold">Tap to Apply</h4>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
