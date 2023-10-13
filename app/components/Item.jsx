"use client";
import Image from "next/image";
import React, { useState } from "react";
import nonveg from "../../public/icons/nonveg.png";
import ToggleString from "./common/ToggleString";
const Item = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <section className="flex justify-between py-7 px-3 border-b-2 border-[#999] border-dotted">
      <div className="flex-[1.2]">
        <Image src={nonveg} height={18} width={18} className="" alt="type" />
        <h3 className="font-raleway text-lg font-semibold ">
          Royal Hyderabadi Platter
        </h3>
        <p className="font-lato font-semibold flex items-center mt-2">
          <span className="text-[#444]">₹ 149</span>
          <span className="text-sm text-[#848484] line-through pl-1">
            ₹ 189
          </span>
        </p>
        <p className="text-yash font-bold mt-3">🔥 +934 Kcal </p>
        <ToggleString
          string="
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque nisi aperiam nam doloribus nulla molestiae accusamus sed atque cum quis! Ipsam ratione nemo illo iure explicabo pariatur error sit.
        "
        />
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="https://i.imgur.com/3vjidlG.jpg"
          width={150}
          height={140}
          alt="item pic"
          className="rounded-xl "
        />
        <p className="text-primary py-2 px-10 border-2 border-primary font-raleway text-xl font-semibold bg-[#FFE7E7] text-center rounded-xl -m-4 relative max-w-[120px] shadow-lg shadow-red-200">
          Add
        </p>
      </div>
    </section>
  );
};

export default Item;
