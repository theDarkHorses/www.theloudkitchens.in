import CuisineDrawer from "@/app/components/CuisineDrawer";
import { getRestaurant } from "@/app/queries/restaurant";


export async function generateMetadata({ params, searchParams }, parent) {
  const restaurantId = params.id;
  const restaurant = await getRestaurant(restaurantId);

  return {
    title: restaurant?.name,
    description: restaurant?.description,
    openGraph: {
      type: "website",
      locale: "en_IE",
      url: restaurant?.imageUrl || "https://www-theloudkitchens-in.vercel.app/icons/tlk.png",

      site_name: `${restaurant?.name} || TheLoudKitchens`,
      images: [
        {
          url: restaurant?.imageUrl || "https://www-theloudkitchens-in.vercel.app/icons/tlk.png",
          width: 1200,
          height: 630,
          alt: restaurant?.name || "Restaurant",
        },
      ],
    }
  };


}


export default function layout({ children, menu }) {
  return (
    <>
      {children}
      {menu}
      <CuisineDrawer />
    </>
  );
}
