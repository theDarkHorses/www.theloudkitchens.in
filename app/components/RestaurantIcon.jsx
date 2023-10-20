import Image from "next/image";
import Link from "next/link";

const RestaurantIcon = ({ isActive, imgSrc, name,id }) => {
  return (
    <Link href={`/restaurants/${id}`} className="flex first-of-type:ml-5 flex-col mt-1 ml-2">
      <div
        className={`h-[82px] w-[82px] ${
          isActive
            ? "bg-primary"
            : "bg-[#DEDEDE]"
        } rounded-2xl flex items-center justify-center shadow-2xl shadow-red-100`}
      >
        <Image
          src={imgSrc}
          height={78}
          width={78}
          className="border-white w-[78px] h-[78px] object-center  object-cover border-2 rounded-2xl"
          alt={name}
        />
      </div>
      <h2 className="max-w-[75px] font-lato text-xs text-center font-semibold pt-1 self-center">
        {name}
      </h2>
    </Link>
  );
};

export default RestaurantIcon;
