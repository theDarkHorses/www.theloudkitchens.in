import { createArray } from "@/app/utils/restaurant";
import React from "react";

const loading = () => {
  return (
    <div className="py-4 mt-4 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
      {createArray(6).map((index) => (
        <div
          className="animate-pulse first-of-type:ml-5 mt-1 ml-2 bg-skeleton rounded-lg  min-w-[250px] h-[244px]"
          key={index}
        />
      ))}
    </div>
  );
};

export default loading;
