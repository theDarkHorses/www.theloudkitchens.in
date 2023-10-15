import { createArray } from "@/app/utils/restaurant";
import React from "react";

const loading = () => {
  return (
    <div className="bg-white divide-y-[1px] border-[#999] border-dotted">
      {createArray(6).map((index) => (
        <div
          className="flex h-[200px]  items-center justify-around"
          key={index}
        >
          <div className=" space-y-3">
            <div className="animate-pulse bg-skeleton h-6 w-[180px] rounded-sm"></div>
            <div className="animate-pulse bg-skeleton h-4 w-[140px] rounded-sm"></div>
            <div className="animate-pulse bg-skeleton h-16 w-[180px] rounded-sm"></div>
          </div>
          <div className="">
            <div className="animate-pulse w-[150px] h-[140px] bg-skeleton rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default loading;
