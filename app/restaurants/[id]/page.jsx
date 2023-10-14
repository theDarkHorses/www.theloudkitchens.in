import Image from "next/image";

import BackRoute from "@/app/components/common/BackRoute";
import DrawerButton from "@/app/components/common/DrawerButton";
import Link from "next/link";

function getRestaurantData() {
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
        name: "Mini-meals",
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

      }
    ]
  }
  const sectionsLabel = res.sections.map(section => section.name);
  return sectionsLabel
}


export default function page({ searchParams }) {

  const sections = getRestaurantData();
  const { tab } =  searchParams
  const activeTab = tab || 0

  return (
    <main>
      <BackRoute />
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
          <DrawerButton />
        </div>
      </section>
      <div className=" bg-white w-full py-4 mt-4 pb-0 border-b sticky top-0">
        <header className="flex items-center first:pl-5 last:pr-5  space-x-5 no-scrollbar overflow-hidden overflow-x-scroll">
          {sections.map((label, index) => <Link href={`?tab=${index}`} className={` font-raleway py-4 leading-none text-center font-semibold border-primary text-sm ${index == activeTab ? "text-primary border-b" : "text-[#969696]"}`} key={index}>{label}</Link>)}
        </header>
      </div>
    </main>
  );
};


