import Image from "next/image";

import BackRoute from "@/app/components/common/BackRoute";
import DrawerButton from "@/app/components/common/DrawerButton";
import Link from "next/link";
import { getRestaurant } from "@/app/queries/restaurant";

async function getRestaurantData(params) {
  const restaurantId = params.id;
  const restaurant = await getRestaurant(restaurantId);
  return restaurant
}

export default async function page({params, searchParams }) {

  const restaurant = await getRestaurantData(params);
  const { tab } =  searchParams
  const activeTab = tab || restaurant?.sections[0]?.id

  return (
    <main className="w-full relative">
      <BackRoute />
      <Image
        src={restaurant?.bannerUrl}
        className="w-full object-cover object-center rounded-b-2xl -z-40 brightness-75 contrast-125 blur-[0.5px]"
        width={350}
        height={200}
        alt="banner"
      />
      <section className="bg-white z-40">
        <div className="flex flex-col items-center ">
          <div className="h-[82px] w-[82px] bg-gradient-to-r from-pink-500 via-red-500 relative -top-8 to-yellow-500 rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={restaurant?.imageUrl}
              height={78}
              width={78}
              className="border-white object-cover object-center w-[78px] h-[78px] border-2 rounded-2xl overflow-hidden"
              alt="item"
            />
          </div>
          <h2 className="font-raleway text-lg text-center font-extrabold pt-1 relative -top-8">
            {restaurant?.name}
          </h2>
          <p className="font-lato text-sm text-[#999] relative -top-8">
            {restaurant?.tags}
          </p>
         {restaurant &&  <DrawerButton name={restaurant?.name} description={restaurant?.description} bannerUrl={restaurant?.bannerUrl} imageUrl={restaurant?.imageUrl}  />}
        </div>
      </section>
      <div className=" bg-white w-full py-4 mt-4 pb-0 border-b">
        <header className="flex items-center first:pl-5 last:pr-5  space-x-5 no-scrollbar overflow-hidden overflow-x-scroll">
          {restaurant?.sections?.map((item) => <Link href={`?tab=${item?.id}`} className={` font-raleway py-4 leading-none text-center font-semibold border-primary text-sm ${item.id == activeTab ? "text-primary border-b" : "text-[#969696]"}`} key={item.id}>{item.name}</Link>)}
        </header>
      </div>
    </main>
  );
};


