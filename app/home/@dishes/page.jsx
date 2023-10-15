import RestaurantItemCard from "@/app/components/RestaurantItemCard";

const cardData = [
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Chicken bund phaard",
    isVeg: false,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings"],
    kCal: 500,
  },
  {
    photoUrl: "https://i.imgur.com/rHQ2DwY.jpg",
    name: "Paneer Butter Masala",
    isVeg: true,
    price: 139,
    time: "40-50",
    tags: ["500g", "900kcal", "3 servings", "3 servings"],
    kCal: 500,
  },
];

export default async function page() {
  return (
    <main className="py-4 mt-4 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
      {cardData.map((item, index) => (
        <RestaurantItemCard
          key={index}
          price={item.price}
          time={item.time}
          name={item.name}
          photoUrl={item.photoUrl}
          isVeg={item.isVeg}
          tags={item.tags}
        />
      ))}
    </main>
  );
}
