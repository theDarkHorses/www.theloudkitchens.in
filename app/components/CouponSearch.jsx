"use client"

import { ChevronLeft } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setCouponDetails, selectTotalWithoutDiscount } from "../store/cartSlice"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"
import { DB } from "../firebaseConfig"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { times } from "lodash"

export default function CouponSearch() {
    const totalWithoutDiscount = useSelector(selectTotalWithoutDiscount)
    const [coupon, setCoupon] = useState("")
    const router = useRouter()
    const { userId: idOfUser } = useAuth()
    const dispatch = useDispatch()

    if (!totalWithoutDiscount) {
        toast.error("Cart is empty")
        return router.push("/home")
    }

    if (totalWithoutDiscount < 200) {
        toast.error("Coupon not applicable to cart value less than ₹200")
        return router.push("/cart")
    }

    const handleApplyCoupon = async () => {
        toast.loading("Applying coupon...", { id: "coupon" })

        if (!coupon) {
            return toast.error("Please enter a valid coupon code", { id: "coupon" })
        }

        try {
            const fetchedCoupon = await getDoc(doc(DB, "coupons", coupon.toLowerCase().trim()))
            if (!(fetchedCoupon).exists()) {
                return toast.error("Invalid Coupon", { id: "coupon" })
            }
            const { discountPercent, maxDiscountValue, minCartValue, validTill, validity, userId } = fetchedCoupon.data()


            if (userId && userId !== idOfUser) {
                return toast.error("Coupon not applicable for this user", { id: "coupon" })
            }

            if (!validity) {
                return toast.error("Coupon expired", { id: "coupon" })
            }

            if(validTill && validTill.toMillis() < Date.now()) {
                return toast.error("Coupon expired", { id: "coupon" })
            }
            if (totalWithoutDiscount < minCartValue) {
                return toast.error("Coupon not applicable to cart value less than ₹" + minCartValue, { id: "coupon" })
            }
            dispatch(setCouponDetails({ id: coupon, discountPercent, maxDiscountValue, minCartValue, validTill, validity, userId }))
            toast.success("Coupon applied", { id: "coupon" })
            router.push("/cart")

        }
        catch (error) {
            console.log(error.message)
            return toast.error("Invalid Coupon", { id: "coupon" })

        }
    }

    return (
        <header className="bg-white rounded-b-2xl shadow-md flex flex-col px-5">
            <div className="flex items-start space-x-3 pt-12 mb-8">
                <Link href={"/cart"}>
                    <ChevronLeft size={24} />
                </Link>
                <div className="">
                    <p className="font-lato text-xl font-bold leading-none">Coupons</p>
                    <p className="font-lato text-[#888] text-xs font-bold">
                        CartValue: ₹{totalWithoutDiscount}
                    </p>
                </div>
            </div>
            <div className="relative pb-5">
                <input
                    className="font-lato  placeholder:text[#949494] py-3 pl-4 border rounded-xl w-full"
                    placeholder="Enter your code here"
                    type="text"
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <button onClick={handleApplyCoupon} className={`absolute top-4 right-4 font-lato ${coupon.length > 3 ? "text-primary" : "text-[#C2C2C2]"} `}>
                    Apply
                </button>
            </div>
        </header>
    )
}
