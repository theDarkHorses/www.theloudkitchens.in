import { getHomeCarouselImageUrls } from "@/app/queries/restaurant";

export default async function page() {
  const { imageUrls } = await getHomeCarouselImageUrls()
  return (
    <main className="space-x-2">
      <div className=" flex justify-start items-center overflow-hidden py-14 overflow-x-scroll  no-scrollbar  snap-x snap-mandatory ">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="aspect-[16/9] shadow-xl shadow-gray-400 mx-4 min-w-[calc(100%_-_40px)]  object-cover object-center bg-cover rounded-lg overflow-hidden snap-center"
          />
        ))}
      </div>
    </main>
  );
}
