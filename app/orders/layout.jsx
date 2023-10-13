"use client"

import { useSearchParams } from "next/navigation"

export default function layout({ menu, children, wallet, coupons }) {
    const searchParams = useSearchParams()
    const activeTab = searchParams.get("tab") || 0 

    return (
        <>
            {children}
            {activeTab==0 && menu}
            {activeTab==1 && coupons}
            {activeTab==2 && wallet}
        </>
    )
}
