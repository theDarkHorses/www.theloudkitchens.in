import Image from "next/image";

export default function page() {
    return (
        <div className=" w-full bg-white px-5  pt-5">
            <div className=" shadow-lg bg-[#AC232305] flex justify-between shadow-[#ac032330] border-primary  border rounded-lg px-4 py-6 mt-4 pb-10">
                <div className="flex flex-col items-center justify-start">
                    <p className="text-[9px] w-full text-[#ac232390] font-lato">
                        Available Balance
                    </p>
                    <p className="font-raleway leading-none text-primary font-bold text-xl">
                        ₹ 0
                    </p>
                </div>
                <div className="flex flex-col items-center justify-start">
                    <p className="text-[9px] w-full text-start text-[#ac232390] font-lato">
                        HQ-Points
                    </p>
                    <p className=" flex items-center space-x-1 font-raleway text-start leading-none text-primary font-bold text-xl">
                        <Image src={"/icons/coin.png"} width={32} height={32} className="w-4 h-4 aspect-square" /> <span>0</span>
                    </p>
                </div>
            </div>
            <p className="font-raleway font-bold text-lg mt-10">Convert points to money</p>
            <div className="p-6 mx-auto shadow shadow-slate-400 rounded-lg mt-5 py-10">
                <div className="flex space-x-1 rounded-lg border-primary border items-center shadow-sm shadow-gray-300 px-2">
                    <Image src={"/icons/coin.png"} width={32} height={32} className="w-4 h-4 aspect-square" />
                    <input placeholder="100" className="w-full p-2  border-text outline-none" />
                </div>
                <Image src={"/icons/convert.svg"} width={32} height={32} className="w-4 h-4 mx-auto aspect-square my-2" />
                <div className="flex space-x-1  rounded-lg border-text border items-center shadow-sm shadow-gray-300 px-2">
                    <Image src={"/icons/rupee.svg"} width={32} height={32} className="w-4 h-4 aspect-square" />
                    <input placeholder="10" className="w-full p-2  border-text outline-none" />
                </div>
                <button className="text-center mt-7 text-primary px-4 py-2 border border-primary rounded-lg w-full shadow-lg shadow-[#AC232320] bg-[#AC232310]">
                    Convert
                </button>
            </div>
            <p className="font-raleway font-bold text-lg mt-10" id="credit">Credits History</p>
            <div className="space-y-4 divide-y-[1px] mt-5 pb-5">
                <div className="flex items-center justify-between py-4">
                    <div className="font-lato">
                        <p className="text-[#777777] text-sm">
                            Oct 11, 2023
                        </p>
                        <p className="text-[#444444] text-lg">
                            Redeemed coupon code
                        </p>
                        <p className="text-[#777777] text-base">Expires on Nov 02, 2023</p>
                    </div>
                    <p className="text-[#00A863] text-lg">+ ₹149</p>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="font-lato">
                        <p className="text-[#777777] text-sm">
                            Oct 11, 2023
                        </p>
                        <p className="text-[#444444] text-lg">
                            Redeemed coupon code
                        </p>
                        <p className="text-[#777777] text-base">Expires on Nov 02, 2023</p>
                    </div>
                    <p className="text-[#00A863] text-lg">+ ₹149</p>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="font-lato">
                        <p className="text-[#777777] text-sm">
                            Oct 11, 2023
                        </p>
                        <p className="text-[#444444] text-lg">
                            Redeemed coupon code
                        </p>
                        <p className="text-[#777777] text-base">Expires on Nov 02, 2023</p>
                    </div>
                    <p className="text-[#00A863] text-lg">+ ₹149</p>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="font-lato">
                        <p className="text-[#777777] text-sm">
                            Oct 11, 2023
                        </p>
                        <p className="text-[#444444] text-lg">
                            Redeemed coupon code
                        </p>
                        <p className="text-[#777777] text-base">Expires on Nov 02, 2023</p>
                    </div>
                    <p className="text-[#00A863] text-lg">+ ₹149</p>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="font-lato">
                        <p className="text-[#777777] text-sm">
                            Oct 11, 2023
                        </p>
                        <p className="text-[#444444] text-lg">
                            Redeemed coupon code
                        </p>
                        <p className="text-[#777777] text-base">Expires on Nov 02, 2023</p>
                    </div>
                    <p className="text-[#00A863] text-lg">+ ₹149</p>
                </div>
            </div>
        </div>
    )
}
