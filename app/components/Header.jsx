import { MapPinIcon } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-4 bg-[#f5f5f5] pt-14 sticky top-0 px-5 flex  items-center justify-between">
      <div className="flex space-x-2">
        <div className="text-primary bg-[#D9D9D9] p-2 rounded-full">
          <MapPinIcon size={24} />
        </div>
        <div className="flex flex-col justify-center ">
          <p className="font-raleway text-sm font-bold">Nit Srinagar</p>
          <p className="text-[#555] font-lato text-xs ">Room- 323 </p>
        </div>
      </div>
      <div className="flex rounded-lg border-[#DDD] items-center border-2 h-fit px-2 py-1">
        <Image src={"/icons/coin.svg"} width={20} height={20} />
        <p className="font-raleway font-semibold text-xs px-1">100</p>
      </div>
    </header>
  );
}