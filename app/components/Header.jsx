import { ChevronRight, MapPinIcon } from "lucide-react";
import coin from "../../public/icons/coin.svg";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-4 pt-14 sticky top-0 px-2 flex  justify-between">
      <div className="flex">
        <div className="text-[#AC2323] bg-[#D9D9D9] p-2 rounded-full">
          <MapPinIcon size={24} />
        </div>
        <div className="flex flex-col justify-center pl-1">
          <p className="font-raleway text-sm font-bold flex">
            Nit Srinagar <ChevronRight size={20} className="text-[#AC2323]" />
          </p>
          <p className="text-[#555] font-lato text-xs leading-[0.8]">
            Room- 323{" "}
          </p>
        </div>
      </div>
      <div className="flex rounded-lg items-center border-2 px-2 py-1">
        <Image src={coin} width={20} height={20} />
        <p className="font-raleway font-semibold text-xs px-1">100</p>
      </div>
    </header>
  );
}
