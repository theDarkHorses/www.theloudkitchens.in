import RestaurantIcon from "@/app/components/RestaurantIcon";
import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";
import seeall from "../../../public/icons/seeall.svg";
import Image from "next/image";

const iconData = [
  {
    isActive: false,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
];

const page = () => {
  return (
    <div className="">
      <div className="flex justify-between px-2">
        <h2 className="font-raleway font-bold text-[#555]">
          Select Restaurant{" "}
        </h2>
        <Link
          href="/"
          className="text-[#AC2323] space-x-2 flex font-lato text-sm items-center font-semibold border-l-2 border-[#AC2323]"
        >
          <span className="pl-2">See all</span>
          <Image src={seeall} height={15} width={7} alt="seeall" />{" "}
        </Link>
      </div>
      <div className="py-2 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
        {iconData?.map(({ isActive, imgSrc, name }, index) => {
          return (
            <RestaurantIcon
              key={index}
              isActive={isActive}
              imgSrc={imgSrc}
              name={name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
