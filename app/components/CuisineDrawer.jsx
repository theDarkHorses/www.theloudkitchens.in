"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCuisine } from "@/app/queries/restaurant";

export default function CuisineDrawer() {
  const [windowHeight] = useState(window.innerHeight);
  const params = useParams();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const item = searchParams.get("item");
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cuisine, setCuisine] = useState(null);
  const handleDrawer = (val) => {
    if (!val) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("item", "");
      router.push(`?${newSearchParams.toString()}`);
    }
    setOpenDrawer(val);
  };

  useEffect(() => {
    const getItem = async () => {
      const cuisineItem = await getCuisine(params.id, tab, item);
      setCuisine(cuisineItem);
    };
    if (tab && item) {
      getItem();
      setOpenDrawer(true);
    }
  }, [tab, item]);

  return (
    <div
      onClick={() => handleDrawer(false)}
      className={`flex  top-0 items-center justify-center fixed bottom-0 left-0 right-0 z-50 h-screen  transition-all backdrop-blur-sm no-scrollbar ${
        openDrawer ? " translate-y-0" : " translate-y-full"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ height: windowHeight * 0.8 }}
        className={`rounded-t-lg overflow-hidden fixed left-0 right-0 bottom-0 bg-[#F6F6F6] overflow-y-scroll no-scrollbar  transition-all z-50 pb-20 ${
          openDrawer ? " translate-y-0" : " translate-y-full"
        }`}
      >
        <div className=" bg-white py-1 mx-2 rounded-lg space-y-5 pb-8">
          <Image
            src={cuisine?.imageUrl}
            width={300}
            height={250}
            className="rounded-lg mx-auto w-full object-cover object-center"
            alt="banner"
          />
          <div className="px-2 flex space-x-2 pl-4">
            <Image
              alt={cuisine?.isVeg ? "veg" : "nonveg"}
              src={cuisine?.isVeg ? "/icons/veg.png" : "/icons/nonveg.png"}
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <div className="flex items-center space-x-2">
              <h1 className="font-raleway text-lg font-bold leading-none">
                {cuisine?.name}
              </h1>
              <p className="text-yash font-lato font-bold leading-none">
                🔥 +{cuisine?.kCal} Kcal
              </p>
            </div>
          </div>
        </div>

        <div className=" py-4 w-full mt-2 items-center no-scrollbar overflow-hidden overflow-y-scroll relative">
          <div className="w-full flex-1 mx-2 py-2  flex justify-start text-sm items-center space-x-2">
            {cuisine?.categories?.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer font-semibold font-raleway border-primary ${
                  activeIndex == index ? "border-b-2 text-primary" : ""
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg py-6">
          <div className="flex justify-between items-center  px-4  py-3 rounded-lg">
            <p className="font-bold font-raleway text-base">Select up-to 4</p>
            <p className="font-lato text-base">(4/4)</p>
          </div>
          <div className="px-2 space-y-2">
            {cuisine?.categories[activeIndex]?.items?.map((item, index) => (
              <div
                className="flex justify-between items-center   space-x-2"
                key={index}
              >
                <div className="font-lato font-normal">
                  <div className="flex items-center space-x-2">
                    <input
                      id={"checkbox" + index}
                      type="checkbox"
                      size={20}
                      color="green"
                      className="w-5 accent-green-600 h-5 font-semibold rounded-full aspect-square"
                    />
                    <label
                      htmlFor={"checkbox" + index}
                      className="font-lato font-semibold text-sm text-[#444444]"
                    >
                      {item?.name}
                    </label>
                  </div>
                </div>
                <div className="bg-[#ac232320] text-sm flex items-center  rounded-lg gap-1 px-2 py-1 space-x-2">
                  <Plus size={16} color="#ac2323" className="cursor-pointer" />
                  <p className="font-lato font-normal text-sm text-primary">
                    1
                  </p>
                  <Minus size={16} color="#ac2323" className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white z-[99999] flex justify-end flex-1 w-full shadow-md shadow-black fixed bottom-0">
        <button className="py-3 px-5 bg-red-600 text-white rounded-lg mx-1 my-4">
          Add To Basket ( 169rs)
        </button>
      </div>
    </div>
  );
}
