import Image from "next/image";
import SearchQuery from "../components/common/SearchQuery";

const DATA = [
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
  {
    photoUrl: "https://i.imgur.com/ZVVeDZ8.png",
    name: "Chowmein",
    restaurant: "Dragon’s wok"
  },
]


export default function page() {

  return (
    <section className="px-5 h-[calc(100vh_-_64px)] bg-white  w-full overflow-hidden z-40">
      <SearchQuery />
      {/* <main className="mt-3">
        <h1 className="uppercase  font-semibold pl-4 mt-10 font-lato  text-[#565D67] text-base">POPULAR ITEMS</h1>
        <div className="mt-4 ">
          {DATA.map((item, index) =>
            <div key={index} className="flex p-2 gap-2">
              <Image src={item.photoUrl} alt={item.name} width={52} height={52} />
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[#292C35] font-medium text-start font-lato text-lg ">
                  {item.name}
                </h3>
                <p className="font-lato text-xs font-medium text-[#A1A5A8] leading-none">
                  {item.restaurant}
                </p>
              </div>
            </div>)}
        </div>
      </main> */}
    </section>
  )
}
