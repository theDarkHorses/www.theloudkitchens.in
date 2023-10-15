import RestaurantIcon from "@/app/components/RestaurantIcon";
import { getHomePageRestaurants } from "@/app/queries/restaurant";

async function getRestaurants() {
  const res = await getHomePageRestaurants();
  return res.sort((a, b) => (a.isActive < b.isActive ? 1 : -1));
}

export default async function page() {
  const restaurants = await getRestaurants();

  return (
    <main className="py-2 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
      {restaurants?.map((restaurant) => (
        <RestaurantIcon
          key={restaurant._id}
          isActive={restaurant.isActive}
          imgSrc={restaurant.imageUrl}
          name={restaurant.name}
          id={restaurant._id}
        />
      ))}
    </main>
  );
}
