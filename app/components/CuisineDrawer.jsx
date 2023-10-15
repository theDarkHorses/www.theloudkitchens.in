"use client";

import {
  Checkbox,
  Drawer,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCuisine } from "@/app/queries/restaurant"


function getRestaurantItem() {
  const data = {
    name: "Royal Hyderabadi Thali",
    categories: [
      {
        name: "Gravies",
        requiredItems: 3,
        items: [
          {
            name: "Paneer Butter Masala",
            price: 100,
            maxPrice: 200,
            nutrition: [
              {
                name: "Calories",
                value: 100,
              },
              {
                name: "Carbs",
                value: 100,
              },
              {
                name: "Protein",
                value: 100,
              },
              {
                name: "Fat",
                value: 100,
              },
            ],
          },
        ],
      },
      {
        name: "Breads",
        requiredItems: 1,
        items: [
          {
            name: "Paneer Butter Masala",
            price: 100,
            maxPrice: 200,
            nutrition: [
              {
                name: "Calories",
                value: 100,
              },
              {
                name: "Carbs",
                value: 100,
              },
              {
                name: "Protein",
                value: 100,
              },
              {
                name: "Fat",
                value: 100,
              },
            ],
          },
        ],
      },
      {
        name: "Rice",
        requiredItems: 1,
        items: [
          {
            name: "Paneer Butter Masala",
            price: 100,
            maxPrice: 200,
            nutrition: [
              {
                name: "Calories",
                value: 100,
              },
              {
                name: "Carbs",
                value: 100,
              },
              {
                name: "Protein",
                value: 100,
              },
              {
                name: "Fat",
                value: 100,
              },
            ],
          },
        ],
      },
    ],
  };

  const subSection = data.categories.map((category) => category.name);

  return { data, subSection };
}


export default function RestaurantDrawer() {
  const { data, subSection } = getRestaurantItem();
  const [windowHeight] = useState(window.innerHeight);
  const params = useParams()
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
      const cuisineItem = await getCuisine(params.id, tab, item)
      setCuisine(cuisineItem)
    }
    if (tab && item) {
      getItem();
      setOpenDrawer(true);
    }
  }, [tab, item]);

  return (
    <Drawer
      open={openDrawer}
      onClose={handleDrawer}
      placement="bottom"
      size={windowHeight * 0.8}
      className="rounded-t-lg overflow-hidden w-full bg-[#F6F6F6] overflow-y-scroll no-scrollbar pb-20"
    >
      <div className=" bg-white py-1 mx-2 rounded-lg space-y-5 pb-8">
        <Image
          src={cuisine?.imageUrl}
          width={300}
          height={250}
          className="rounded-lg mx-auto"
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

      <div className="flex py-4 w-full mt-2 items-center no-scrollbar overflow-hidden overflow-x-scroll">
        <Tabs className="w-full flex-1 mx-2" value={activeIndex} >
          <TabsHeader
            className="justify-between bg-transparent no-scrollbar overflow-hidden overflow-x-scroll"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 text-primary border-gray-900 border-primary shadow-none rounded-none",
            }}
          >
            {cuisine?.categories?.map((item, index) => (
              <Tab
                onClick={() => setActiveIndex(index)}
                value={index}
                key={index}
                className={` text-sm font-raleway font-bold  ${index == activeIndex ? "text-primary" : null
                  }`}
              >
                {item?.name}
              </Tab>
            ))}
          </TabsHeader>
          <div

            className="bg-white mt-2 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center  px-4 pt-6 rounded-lg">
              <p className="font-bold font-raleway text-base">
                Select up-to 4
              </p>
              <p className="font-lato text-base">(4/4)</p>
            </div>
            <TabsBody>

              {cuisine?.categories?.map((category, index) => (
                <TabPanel value={index} key={index} className="px-2" >
                  {category?.items?.map((item, index) => (
                    <div className="flex justify-between items-center   space-x-2" key={index}>
                      <div className="font-lato font-normal">
                        <Checkbox size={20} color="green" className="w-5 h-5 font-semibold rounded-full aspect-square" label={
                          <p className="font-lato font-semibold text-base text-[#444444]">{item.name}</p>
                        } />
                      </div>
                      <div className="bg-[#ac232320] flex items-center  rounded-lg gap-1 px-2 py-1 space-x-2">
                        <Plus size={16} color="#ac2323" className="cursor-pointer" />
                        <p className="font-lato font-normal text-base text-primary">{item.price}</p>
                        <Minus size={16} color="#ac2323" className="cursor-pointer" />
                      </div>
                    </div>
                  ))}

                </TabPanel>
              ))}
            </TabsBody>
          </div>
        </Tabs>
      </div>
      <div className="bg-white w-full fixed flex justify-end flex-1  shadow-md shadow-black bottom-0 z-50">
        <button className="py-3 px-5  bg-[#E00000] text-white rounded-lg mx-1 my-4">
          Add To Basket ( 169rs)
        </button>
      </div>
    </Drawer>
  );
}
