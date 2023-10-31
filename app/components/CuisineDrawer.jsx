"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { getCuisine } from "@/app/queries/restaurant";
import DrawerCuisine from "./DrawerCuisine";

function CuisineDrawer() {
  const [windowHeight] = useState(window.innerHeight);
  const params = useParams();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const item = searchParams.get("item");
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cuisine, setCuisine] = useState(null);
  const [craftedCuisine, setCraftedCuisine] = useState({});

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
    } else {
      setCraftedCuisine({});
    }
  }, [tab, item]);

  return (
    <div
      className=" relative"
    >
      <div onClick={() => handleDrawer(false)}
        className={`flex top-0 items-end fixed justify-center bottom-0 z-0 left-0 right-0 h-screen  transition-all opacity-[0.77] bg-black no-scrollbar ${openDrawer ? " translate-y-0" : " translate-y-full"
          }`} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ height: windowHeight * 0.8 }}
        className={`rounded-t-lg bottom-0 fixed overflow-hidden z-[99999] self-end h-full w-full flex flex-col flex-1 bg-[#F6F6F6] overflow-y-scroll no-scrollbar  transition-all  ${openDrawer ? " translate-y-0" : " translate-y-full"
          }`}
      >
        <DrawerCuisine cuisine={cuisine} craftedCuisine={craftedCuisine} setCraftedCuisine={setCraftedCuisine} restaurantId={params.id} tabId={tab} itemId={item} drawerStatus={openDrawer} />
      </div>
    </div>
  );
}

export default memo(CuisineDrawer)