"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        label: "Home",
        icon: "/icons/homeOutline.png",
        activeIcon: "/icons/home.png",
        pathName: "/"
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
        label: "Cart",
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
        <footer className='w-full h-16 border absolute bottom-0 left-0 right-0 shadow-sm shadow-slate-600 rounded-t-md'>
            <ul className="flex gap-2 items-center justify-center h-full">
                {navLinks.map(item =>
                    <Link href={item.pathName} className="flex-1  border-primary gap-2 flex flex-col items-center justify-center">
                        <Image src={pathName == item.pathName ? item.activeIcon : item.icon} width={20} height={20} />
                        <p className={`capitalize text-yash  font-raleway ${pathName == item.pathName ? "text-primary font-semibold" : "text-text"}`}>{item.label}</p>
                    </Link>
                )}
            </ul>
        </footer>
    )
}
