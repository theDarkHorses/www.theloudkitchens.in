import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantIcon = ({ isActive, imgSrc, name }) => {
  console.log(name);
  return (
    <Link href={"/restaurants"} className="flex first-of-type:ml-5 flex-col mt-1 ml-2">
      <div className="h-[82px] w-[82px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl flex items-center justify-center">
        <Image
          src={imgSrc}
          height={78}
          width={78}
          className="border-white border-2 rounded-2xl"
          alt={name}
        />
      </div>
      <h2 className="max-w-[75px] font-lato text-xs text-center font-semibold pt-1">
        {name}
      </h2>
    </Link>
  );
};

export default RestaurantIcon;
