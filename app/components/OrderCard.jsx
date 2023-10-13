import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderCard() {
    return (
        <div className="shadow-sm rounded-xl shadow-slate-300 w-full overflow-hidden divide-y-[1px]">
            <div className="flex p-4 items-center bg-[#F8F9FD] space-x-2 justify-between">
                <Image
                    src="https://i.imgur.com/rHQ2DwY.jpg"
                    className=" aspect-square rounded-lg w-16 h-16"
                    width={60}
                    height={60}
                    alt="restaurant"
                />
                <div className="space-y-1 flex flex-col justify-center w-full">
                    <p className=" font-lato text-base leading-tight text-[#2A3143] font-bold">
                        The Great Indian Thalis...
                    </p>
                    <p className="font-lato text-xs text-[#757C8F] leading-tight">
                        Room 323 chenab, NIT Srinagar h..
                    </p>
                </div>
                <button className="border border-primary bg-[#AC232310] text-black rounded-lg text-sm px-4 shadow-lg cursor-pointer shadow-[#AC232320] py-1 ">
                    Rep<span className="text-primary">EAT</span>
                </button>
            </div>
            <div className="pt-4 space-y-5">
                <div className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={"/icons/veg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">1 x</span> Paneer Butter Masala </p>
                            <p className=" font-lato text-xs text-[#757C8F]">750ml </p>
                        </div>
                    </div>
                </div>
                <div className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={"/icons/veg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">1 x</span> Paneer Butter Masala </p>
                            <p className=" font-lato text-xs text-[#757C8F]">750ml </p>
                        </div>
                    </div>
                </div>
                <div className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={"/icons/veg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">1 x</span> Paneer Butter Masala </p>
                            <p className=" font-lato text-xs text-[#757C8F]">750ml </p>
                        </div>
                    </div>
                </div>
                <div className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={"/icons/veg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">1 x</span> Paneer Butter Masala </p>
                            <p className=" font-lato text-xs text-[#757C8F]">750ml </p>
                        </div>
                    </div>
                </div>
                <div className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={"/icons/veg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">1 x</span> Paneer Butter Masala </p>
                            <p className=" font-lato text-xs text-[#757C8F]">750ml </p>
                        </div>
                    </div>
                </div>
                <div className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={"/icons/veg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">1 x</span> Paneer Butter Masala </p>
                            <p className=" font-lato text-xs text-[#757C8F]">750ml </p>
                        </div>
                    </div>
                </div>
                <div className="w-full  border-t border-dashed " />
                <Link href="/orders/1" className="flex justify-between items-cente px-4 text-sm pb-6">
                    <p className="text-[#757C8F]">
                        20 Oct 2023 at 10:15PM
                    </p>
                    <div className="flex items-center space-x-1">
                        <p className="font-bold">₹ 420.69</p>
                        <ChevronRight size={20} color="#9096A6" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
