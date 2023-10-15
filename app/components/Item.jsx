import Image from "next/image";
import ToggleString from "./common/ToggleString";
import Link from "next/link";

const Item = ({ item, activeTab }) => {

  return (
    <section className="flex justify-between py-7 px-5">
      <div className="w-2/3">
        <Image src={item.isVeg?"/icons/veg.png":"/icons/nonveg.png"} height={18} width={18} className="" alt="type" />
        <h3 className="font-raleway text-lg font-semibold ">
          {item.name}
        </h3>
        <p className="font-lato font-semibold flex items-center mt-2">
          <span className="text-[#444]">₹ {item.price}</span>
          <span className="text-sm text-[#848484] line-through pl-1">
            ₹ {item.mrp}
          </span>
        </p>
        <p className="text-xs font-lato font-semibold text-[#555555] mt-5 mb-2">🔥 +{item.kCal} Kcal </p>
        <ToggleString
          string={item.description}
        />
      </div>
      <div className="flex flex-col items-center w-1/3">
        <Image
          src={item.imageUrl}
          width={150}
          height={140}
          alt="item pic"
          className="rounded-xl "
        />
        <Link href={`?tab=${activeTab}&item=${item.id}`} className="text-primary py-1 px-8 border-[1px] border-primary font-raleway text-lg font-semibold bg-[#FFE7E7] text-center rounded-lg  relative -top-3  shadow-lg shadow-red-100">
          ADD
        </Link>
      </div>
    </section>
  );
};

export default Item;
