import Item from "@/app/components/Item";
import { getRestaurantSections } from "@/app/queries/restaurant";
import React from "react";



async function getRestaurantSectionsData(params, searchParams) {
  const restaurantId = params.id;
  const activeTab = searchParams.tab
  const restaurant = await getRestaurantSections(restaurantId);
  return restaurant.sections.find((item) => item.id == activeTab) || restaurant.sections[0]

}

const page = async ({ searchParams, params }) => {
  const section = await getRestaurantSectionsData(params, searchParams)
  return (
    <div className="bg-white divide-y-[1px] border-[#999] border-dotted">
      {section.menu?.map((item, index) => (
        <Item key={index} item={item} activeTab={section.id} />
      ))}
    </div>
  );
};

export default page;
