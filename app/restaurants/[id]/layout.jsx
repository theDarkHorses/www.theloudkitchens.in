import Image from "next/image";
import React from "react";
import share from "../../../public/icons/share.svg";
const layout = ({ children, menu }) => {
  return (
    <main>
      <Image
        src="https://i.imgur.com/rHQ2DwY.jpg"
        className="w-screen"
        width={350}
        height={200}
        alt="banner"
      />
      <section className="bg-white pb-8">
        <div className="flex flex-col items-center -mt-8">
          <div className="h-[82px] w-[82px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl flex items-center justify-center">
            <Image
              src="https://i.imgur.com/3vjidlG.jpg"
              height={78}
              width={78}
              className="border-white border-2 rounded-2xl"
            />
          </div>
          <h2 className="font-raleway text-lg text-center font-extrabold pt-1">
            Great Indian Thalis
          </h2>
          <p className="font-lato text-sm text-[#999]">
            North Indian &bull; Fast food
          </p>
          <div className="flex font-lato text-xs text-[#808080] border-[1px] border-dashed border-[#808080] px-3 py-1 space-x-2 mt-3">
            <p>Explore</p>
            <Image src={share} height={9} width={9} />
          </div>
        </div>
      </section>
      <section className="">{menu}</section>
    </main>
  );
};

export default layout;
