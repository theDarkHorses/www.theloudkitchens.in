"use client"

import { useClerk } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()
    const { signOut } = useClerk()
    return (
        <button
            onClick={() => signOut(() => router.replace("/"))}
            className="flex items-center pr-2 py-1 justify-center w-full"
        >
            <div className="flex space-x-3 items-center flex-1">
                <Image
                    alt="images"
                    src={"/icons/plogout.svg"}
                    width={32}
                    height={32}
                    className="w-10 h-10"
                />
                <p className="font-lato text-lg">Log out</p>
            </div>
            <ChevronRight size={20} color="#767C8F" />
        </button>
    )
}
