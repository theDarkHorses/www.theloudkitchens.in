"use client";

import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { DB } from "../firebaseConfig";
import { deliveryStatusColor } from "../utils/delivery";

export default function OrderCard({ orderId, address, total, time, cartItems, orderStatus }) {
    const date = new Date(time);
    const formattedDate = date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });
    const items = useMemo(() => {
        return cartItems.map(item => Object.values(item.selectedItems).map(item => Object.values(item)).flat())
    }, [cartItems])

    const [status, setStatus] = useState(orderStatus);

    useEffect(() => {
        const orderRef = doc(DB, "orders", orderId);

        const unsubscribe = onSnapshot(orderRef, (doc) => {
            const data = doc.data();
            setStatus(data.status);
        });

        return () => {
            unsubscribe();
        };
    }, [orderId]);

    return (
        <div className="shadow-sm rounded-xl shadow-slate-300 w-full overflow-hidden divide-y-[1px]">
            <div className="flex p-4 items-center bg-[#F8F9FD] space-x-2 justify-between">
                {/* <Image
                    src="https://i.imgur.com/rHQ2DwY.jpg"
                    className=" aspect-square rounded-lg w-16 h-16"
                    width={60}
                    height={60}
                    alt="restaurant"
                /> */}
                <div className="space-y-1 flex flex-col justify-center w-full">
                    <p className=" font-lato text-base leading-tight text-[#2A3143] font-bold">
                        # {orderId}
                    </p>
                    <p className="font-lato text-xs text-[#757C8F] leading-tight">
                        {address}
                    </p>
                </div>
                {/* <button className="border border-primary bg-[#AC232310] text-black rounded-lg text-sm px-4 shadow-lg cursor-pointer shadow-[#AC232320] py-1 ">
                    Rep<span className="text-primary">EAT</span>
                </button> */}
                <div className="flex  items-center space-x-2">
                    <span className={`animate-ping  inline-flex h-1 w-1 rounded-full ${deliveryStatusColor(status)} delay-300 `} />
                    <p className="font-lato text-sm text-[#555]">{status}</p>
                </div>
            </div>
            <div className="pt-4 space-y-5">

                {items.map((cuisine, index) => <div key={index} className="px-4 w-full bg-white space-y-2">
                    <div className="flex items-start space-x-3">
                        <Image src={cartItems?.[index]?.isVeg ? "/icons/veg.png" : "/icons/nonveg.png"} width={40} height={40} className="w-5 h-5 aspect-square" alt={cartItems?.[index]?.isVeg ? "veg":"nonveg"} />
                        <div className="space-y-1">
                            <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">{cartItems?.[index]?.quantity} x</span> {cartItems?.[index]?.name}</p>
                            <p className=" font-lato text-xs text-[#757C8F] space-x-1 mt-1">
                                {cuisine.map((item, index) => (
                                    <span key={index}>
                                        {item.quantity} x{item.item.name} {cuisine.length - 1 == index ? "" : " · "}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>)
                }
                <div className="w-full  border-t border-dashed " />
                <div className="flex justify-between items-cente px-4 text-sm pb-6">
                    <p className="text-[#757C8F]">
                        {formattedDate}
                    </p>
                    <div className="flex items-center space-x-1">
                        <p className="font-bold">₹ {total}</p>
                        {/* <ChevronRight size={20} color="#9096A6" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
