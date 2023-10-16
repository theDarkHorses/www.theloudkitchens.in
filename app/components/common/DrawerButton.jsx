"use client"
import Image from "next/image";
import { useState, Fragment } from "react";

const DrawerButton = ({ name, description, imageUrl, bannerUrl }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [windowHeight] = useState(window.innerHeight);

  return (
    <Fragment>
      <div
        className="flex cursor-pointer relative -top-8 font-lato text-xs text-[#808080] border-b-[1px] border-dashed border-[#808080] py-1 space-x-2 mt-3 "
        onClick={() => setOpenDrawer(true)}
      >
        <p>Explore</p>
        <Image src={"/icons/share.svg"} height={9} width={9} alt="img" />
      </div>
      <div
        onClick={() => setOpenDrawer(false)}
        className={`fixed top-0 left-0 right-0 bottom-0 flex items-end z-50 backdrop-blur-md transition-all duration-300 ease-in-out ${openDrawer ? " translate-y-0" : " translate-y-full"
          }`}
      >
        <div
          style={{ height: windowHeight * 0.8 }}
          onClick={(e) => e.stopPropagation()}
          className={`rounded-t-lg pb-20 transition-all z-auto ease-in-out bg-app overflow-hidden overflow-y-scroll duration-300 delay-75 no-scrollbar ${openDrawer ? "h-screen" : "h-0"
            }`}
        >
          <div className="p-2 bg-white pb-6 z-50">
            <Image
              src={bannerUrl}
              width={350}
              height={120}
              className="rounded-lg"
              alt="restaurant"
            />
            <div className="flex items-center pl-6 space-x-2">
              <Image
                src={imageUrl}
                height={78}
                width={78}
                className="border-white bg-white relative -top-5 object-cover rounded-full object-center w-[78px] h-[78px] border-2"
                alt="item"
              />
              <div className="relative -top-3">
                <h3 className="font-raleway font-bold text-lg capitalize">
                  {name}
                </h3>
                <h3 className="font-lato font-bold text-xs capitalize text-[#7c7c7c]">
                  271 Followers
                </h3>
              </div>
            </div>
          </div>

          <h4 className="bg-white mt-4 font-lato text-[#666] text-sm px-6 py-6">
            {description}
          </h4>
          <div className="bg-white z-[99999] flex justify-end flex-1 w-full shadow-md shadow-black fixed bottom-0">
            <button className="py-3 px-5 bg-red-600 text-white rounded-lg mx-1 my-4">
              Follow Our Journey
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DrawerButton;
