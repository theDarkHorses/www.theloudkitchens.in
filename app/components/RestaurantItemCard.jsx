import Image from "next/image";
import { GaugeCircle } from "lucide-react";
import Link from "next/link";

export default function RestaurantItemCard({
  name,
  photoUrl,
  isVeg,
  tags,
  time,
  price,
  link
}) {
  return (
    <Link
      href={link}
      className="first-of-type:ml-5 last-of-type:mr-5 shadow-lg relative snap-center shadow-gray-300 bg-white min-w-[250px] rounded-md max-w-card overflow-hidden"
    >
      <Image
        alt={name}
        src={photoUrl}
        width={241}
        height={124}
        className="object-cover object-center aspect-[241/124] min-w-[250px] max-w-card"
      />
      <div className="flex items-start p-2 space-x-2 ">
        <Image
          alt={isVeg ? "veg item" : "non-veg item"}
          src={isVeg ? "/icons/vegTlk.png" : "/icons/nonvegTlk.png"}
          width={36}
          height={36}
          className="w-10 h-10 bg-white rounded-full p-[1px] absolute left-[11px] top-[83px]"
        />
        <Image
          alt={isVeg ? "veg item" : "non-veg item"}
          src={isVeg ? "/icons/veg.png" : "/icons/nonveg.png"}
          width={12}
          height={12}
          className="w-3 h-3 relative top-1"
        />
        <div className=" ">
          <h2 className="font-raleway text-lg font-bold leading-tight">
            {name}
          </h2>
          <div className="space-x-2">
            <span className="text-text text-xs font-lato ">
              {tags}
            </span>
          </div>
          <div className="items-center flex space-x-1 border-b border-dashed border-[#AC231816] pb-2">
            <GaugeCircle size={12} color="#2A70FA" />
            <span className="text-text text-xs font-lato ">{time}</span>
          </div>
          <p className="font-lato text-xs font-black mt-2 mb-1">₹ {price}</p>
        </div>
      </div>
    </Link>
  );
}
