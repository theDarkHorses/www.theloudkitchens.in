"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        label: "Home",
        icon: "/icons/homeOutline.png",
        activeIcon: "/icons/home.png",
        pathName: "/home"
    },
    {
        label: "Search",
        icon: "/icons/searchOutline.png",
        activeIcon: "/icons/search.png",
        pathName: "/search"

    },
    {
        label: "What’s New",
        icon: "/icons/whatsnewOutline.png",
        activeIcon: "/icons/whatsnew.png",
        pathName: "/whatsnew"

    },
    {
        label: "FoodBasket",
        icon: "/icons/cartOutline.png",
        activeIcon: "/icons/cart.png",
        pathName: "/cart"

    },
    {
        label: "Profile",
        icon: "/icons/profileOutline.png",
        activeIcon: "/icons/profile.png",
        pathName: "/profile"

    }
]

export default function Footer() {
    const pathName = usePathname()
    return (
        <footer className=' bg-white h-16 border fixed bottom-0 left-0 right-0 w-full shadow-lg shadow-slate-600 rounded-t-md'>
            <ul className="flex gap-2 items-center justify-center h-full">
                {navLinks.map(item =>
                    <Link href={item.pathName} key={item.pathName} className="flex-1  border-primary gap-2 flex flex-col items-center justify-center">
                        <Image alt="navigation items" src={pathName == item.pathName ? item.activeIcon : item.icon} width={20} height={20} className="w-5 h-5 aspect-square" />
                        <p className={`capitalize text-yash  font-raleway ${pathName == item.pathName ? "text-primary font-semibold" : "text-text"}`}>{item.label}</p>
                    </Link>
                )}
            </ul>
        </footer>
    )
}
