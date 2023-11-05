"use client";
import { ChevronRightIcon } from "lucide-react";
import offer from "../../public/icons/offer2.png";
import tick from "../../public/icons/dtick.svg";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectCoupon, setCouponDetails } from "../store/cartSlice";

const CouponCard = ({ id, discountPercent, maxDiscountValue, minCartValue, validTill, validity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const dispatch = useDispatch();
  const coupon = useSelector(selectCoupon);

  const date = validTill.toDate();
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#ccc]">
      <Image
        src={offer}
        height={44}
        width={44}
        className={`relative transition-all duration-300 ease-in-out -top-6 ${isOpen ? "left-[calc(50%_-_22px)]" : "left-3"
          }`}
        alt="offer"
      />
      <div className="relative -top-4 space-y-8 px-9">
        <h4 className="font-lato font-bold text-[#1C1C1C]">
          {discountPercent}% OFF up to ₹{maxDiscountValue}
        </h4>
        <div className="font-lato text-primary text-xs font-bold flex justify-between items-center ">
          <div className="border rounded px-3 py-1">{id}</div>
          <div
            className="flex space-x-1 items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            More <ChevronRightIcon size={16} className="rotate-90" />
          </div>
        </div>
      </div>
      {/* Information */}

      <div
        className={`mx-4 border-t transition-height duration-300 ease-in-out border-dashed overflow-hidden ${isOpen ? "h-20" : "h-0 "
          }`}
      >
        <ul className="py-5 text-[#636989CC] font-lato text-xs font-bold list-disc px-3">
          <li className="">
            offer applicable on min. cart value of ₹{minValue}
          </li>
          <li className="">offer valid till {formattedDate}</li>
          <li className="">Valid {validity} per user</li>
        </ul>
      </div>
      <div
        onClick={() => setIsApplied(!isApplied)}
        className="border-dashed bg-[#ececec] cursor-pointer py-2 border-[#9BA1C1] border-t-[1px] flex items-center justify-center rounded-b-2xl"
      >
        {isApplied ? (
          <div className="flex items-center justify-center">
            <Image src={tick} height={14} width={24} alt="tick" className="" />
            <h4 className="font-lato text-blue-700 font-bold">Applied</h4>
          </div>
        ) : (
          <h4
            className="font-lato text-primary  font-bold"
            onClick={() => {
              dispatch(
                setCouponDetails({
                  id,
                  discountPercent,
                  maxDiscountValue,
                  minCartValue,
                  validTill,
                  validity
                })
              );
            }}
          >
            Tap to Apply
          </h4>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
