import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <div className=" bg-white shadow-lg shadow-gray-300 mx-2 my-3 rounded-lg flex items-center py-2 px-2 space-x-2">
        <div className="">
          <Image
            src="https://i.imgur.com/3vjidlG.jpg"
            height={72}
            width={72}
            className="rounded-full"
          />
        </div>
        <div className="">
          <h3 className="font-raleway text-2xl font-bold">Rahi Uppal</h3>
          <h3 className="font-raleway text-sm text-primary">View activity </h3>
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  );
}
