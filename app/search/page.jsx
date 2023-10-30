import Image from "next/image";
import SearchQuery from "../components/common/SearchQuery";
import { getPopularItems } from "../queries/restaurant";
import { extractPopularItems } from "../utils/restaurant";
import Link from "next/link";

export default async function page() {
  const popularItems = await getPopularItems();
  const extractedPopularItems = extractPopularItems(popularItems);
  return (
    <section className="px-5 h-full bg-white  w-full overflow-hidden z-40 ">
      <SearchQuery />
      <main className="mt-3">
        <h1 className="uppercase  font-semibold pl-4 mt-10 font-lato  text-[#565D67] text-base">POPULAR ITEMS</h1>
        <div className="mt-4 ">
          {extractedPopularItems?.map((item, index) =>
            <Link href={`/restaurants/${item.restaurantId}?tab=${item.sectionId}&item=${item.item.id}`} key={index} className="flex p-2 gap-2">
              <Image src={item.item.imageUrl} alt={item.name || "restaurant item"} width={52} height={52} className="rounded-lg overflow-hidden aspect-square object-cover object-center" />
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[#292C35] font-medium text-start font-lato text-lg ">
                  {item.item.name}
                </h3>
                <p className="font-lato text-xs font-medium text-[#A1A5A8] leading-none">
                  {item.restaurantName}
                </p>
              </div>
            </Link>)}
        </div>
      </main>
    </section>
  )
}
