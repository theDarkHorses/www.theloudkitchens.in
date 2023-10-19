import RestaurantItemCard from "@/app/components/RestaurantItemCard";
import { getPopularItems } from "@/app/queries/restaurant";
import { extractPopularItems } from "@/app/utils/restaurant";

export default async function page() {
  const popularItems = await getPopularItems();
  const extractedPopularItems = extractPopularItems(popularItems);
  return (
    <main className="pt-5 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
      {extractedPopularItems.map((item, index) => (
        <RestaurantItemCard
          key={index}
          price={item.item.price}
          time={item.item.preparationTime}
          name={item.item.name}
          photoUrl={item.item.imageUrl}
          isVeg={item.item.isVeg}
          tags={`${item.item.tags} • ${item.item.servings}`}
          link={`/restaurants/${item.restaurantId}?tab=${item.sectionId}&item=${item.item.id}`}
        />
      ))}
    </main>
  );
}
