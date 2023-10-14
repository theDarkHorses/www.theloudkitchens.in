import Item from "@/app/components/Item";
import React from "react";

function getRestaurantData(activeTab) {
  const res = {
    name: "Great Indian Thalis",
    cuisine: "North Indian &bull; Fast food",
    description: "Great Indian Thalis is a casual dining restaurant serving North Indian and Fast Food preparations. A great place in Sector 18, it is praised for its stylish presentation and is a nice joint to visit when one is looking to satiate hunger pangs with tasty, hygienic food at nominal prices.",
    image: "https://i.imgur.com/3vjidlG.jpg",
    banner: "https://i.imgur.com/rHQ2DwY.jpg",
    sections: [
      {
        name: "Thalis",
        menu: [
          {
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
                        value: 100
                      },
                      {
                        name: "Carbs",
                        value: 100
                      },
                      {
                        name: "Protein",
                        value: 100
                      },
                      {
                        name: "Fat",
                        value: 100
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]

      },
      {
        name: "Gravies",
        menu: [
          {
            name: "Chicken Bunna Masala",
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
                        value: 100
                      },
                      {
                        name: "Carbs",
                        value: 100
                      },
                      {
                        name: "Protein",
                        value: 100
                      },
                      {
                        name: "Fat",
                        value: 100
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]

      },
      {
        name: "Mini-meals",
        menu: [
          {
            name: "Paneer Platter",
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
                        value: 100
                      },
                      {
                        name: "Carbs",
                        value: 100
                      },
                      {
                        name: "Protein",
                        value: 100
                      },
                      {
                        name: "Fat",
                        value: 100
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]

      }
    ]
  }
  const { sections } = res

  return sections[activeTab]
}

const page = ({ searchParams }) => {
  const { tab } = searchParams
  const activeTab = tab || 0
  const section = getRestaurantData(activeTab)

  return (
    <div className="bg-white divide-y-[1px] border-[#999] border-dotted">
     {section.menu.map((item, index) => (
      <Item key={index} item={item} activeTab={activeTab} />
     ))}
    </div>
  );
};

export default page;
