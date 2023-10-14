
import Image from "next/image";
import ToggleString from "./common/ToggleString";
import Link from "next/link";


const Item = ({ item, activeTab }) => {

  return (
    <section className="flex justify-between py-7 px-5">
      <div className="w-2/3">
        <Image src={"/icons/nonveg.png"} height={18} width={18} className="" alt="type" />
        <h3 className="font-raleway text-lg font-semibold ">
          {item.name}
        </h3>
        <p className="font-lato font-semibold flex items-center mt-2">
          <span className="text-[#444]">₹ 149</span>
          <span className="text-sm text-[#848484] line-through pl-1">
            ₹ 189
          </span>
        </p>
        <p className="text-xs font-lato font-semibold text-[#555555] mt-5 mb-2">🔥 +934 Kcal </p>
        <ToggleString
          string="
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque nisi aperiam nam doloribus nulla molestiae accusamus sed atque cum quis! Ipsam ratione nemo illo iure explicabo pariatur error sit.
        "
        />
      </div>
      <div className="flex flex-col items-center w-1/3">
        <Image
          src="https://i.imgur.com/3vjidlG.jpg"
          width={150}
          height={140}
          alt="item pic"
          className="rounded-xl "
        />
        <Link href={`?tab=${activeTab}&item=${item.name}`} className="text-primary py-1 px-8 border-[1px] border-primary font-raleway text-lg font-semibold bg-[#FFE7E7] text-center rounded-lg -m-4 relative  shadow-lg shadow-red-200">
          ADD
        </Link>
      </div>
    </section>
  );
};

export default Item;
