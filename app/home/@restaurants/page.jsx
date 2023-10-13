import RestaurantIcon from "@/app/components/RestaurantIcon";

const iconData = [
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: true,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: false,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: false,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: false,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
  {
    isActive: false,
    imgSrc: "https://i.imgur.com/3vjidlG.jpg",
    name: "Great Indian Thalis",
  },
];

const page = () => {
  return (
    <main className="py-2 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
      {iconData?.map(({ isActive, imgSrc, name }, index) => {
        return (
          <RestaurantIcon
            key={index}
            isActive={isActive}
            imgSrc={imgSrc}
            name={name}
            id={index}
          />
        );
      })}
    </main>
  );
};

export default page;
