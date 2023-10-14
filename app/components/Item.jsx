"use client";
import Image from "next/image";
import React, { useState } from "react";
import ToggleString from "./common/ToggleString";
const Item = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <section className="flex justify-between py-7 px-5 border-b-2 border-[#999] border-dotted">
      <div className="w-2/3">
        <Image src={"/icons/nonveg.png"} height={18} width={18} className="" alt="type" />
        <h3 className="font-raleway text-lg font-semibold ">
          Royal Hyderabadi Platter
        </h3>
        <p className="font-lato font-semibold flex items-center mt-2">
          <span className="text-[#444]">₹ 149</span>
          <span className="text-sm text-[#848484] line-through pl-1">
            ₹ 189
          </span>
        </p>
        <p className="text-xs font-lato font-semibold text-[#555555] mt-5 mb-2">🔥 +934 Kcal </p>
        <ToggleString
          string="
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque nisi aperiam nam doloribus nulla molestiae accusamus sed atque cum quis! Ipsam ratione nemo illo iure explicabo pariatur error sit.
        "
        />
      </div>
      <div className="flex flex-col items-center w-1/3">
        <Image
          src="https://i.imgur.com/3vjidlG.jpg"
          width={150}
          height={140}
          alt="item pic"
          className="rounded-xl "
        />
        <p className="text-primary py-1 px-8 border-[1px] border-primary font-raleway text-lg font-semibold bg-[#FFE7E7] text-center rounded-lg -m-4 relative max-w-[120px] shadow-lg shadow-red-200">
          ADD
        </p>
      </div>
    </section>
  );
};

export default Item;
