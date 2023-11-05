"use client"

import { ChevronLeft, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import QRCode from "qrcode.react";
import { generateUPIPaymentUrl } from "../utils/restaurant";
import { selectCartItems, selectConfessionText, selectCookingReqText, selectPlatformFee, selectDeliveryFee, selectGSTAndRestaurantCharges, selectSelectedAddress, selectTotal, selectTotalWithoutDiscount } from "../store/cartSlice";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useFirebaseStorage from "../hooks/firebaseStorage";
import { v4 as uuid } from "uuid";
import { useUser } from "@clerk/nextjs";
import { clearCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux"
import { addDoc, collection } from "firebase/firestore";
import { DB } from "../firebaseConfig";
import { MINORDERVALUE, PENDING } from "../utils/constants";
import { useRouter } from "next/navigation";


export default function page() {
    const total = useSelector(selectTotal)
    const { imageUrl, uploadImage } = useFirebaseStorage();
    const fileInputRef = useRef(null);
    const [uid] = useState(uuid());
    const dispatch = useDispatch()
    const { user } = useUser()
    const cartItems = useSelector(selectCartItems);
    const platformFee = useSelector(selectPlatformFee)
    const gstAndRestaurantCharges = useSelector(selectGSTAndRestaurantCharges)
    const totalWithoutDiscount = useSelector(selectTotalWithoutDiscount)
    const deliveryFee = useSelector(selectDeliveryFee)
    const selectedAddress = useSelector(selectSelectedAddress)
    const confessionText = useSelector(selectConfessionText)
    const cookingReqText = useSelector(selectCookingReqText)
    const router = useRouter()



    useEffect(() => {
        toast.loading("Processing...", { id: "order" });

        const verifyPayment = () => {
            if (!cartItems?.length || totalWithoutDiscount < 200 || !selectedAddress) {
                toast.error("No items added", { id: "order" })
                return router.replace("/cart")
            }
        }
        verifyPayment()

        return () => toast.dismiss("order");
    }, []);


    useEffect(() => {
        if (imageUrl) {
            try {
                handleCheckout(imageUrl)
            } catch (error) {
                console.log(error.message)
            }
        }
    }, [imageUrl])



    const handleUp = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const newFile = event.target.files[0];
        const renamedFile = new File([newFile], uid + "_" + newFile.name, {
            type: newFile.type,
        });
        if (renamedFile && renamedFile.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5 MB");
            return;
        }
        try {
            await uploadImage(renamedFile, "orders");
        } catch (err) {
            toast.error("Error uploading image. Please try again.");
        }
    };

    const handleCheckout = async (paymentProofUrl) => {
        if (!cartItems?.length) return toast.error("No items added", { id: "order" })
        if (!selectedAddress) return toast.error("Please select an address", { id: 'order' })
        if (totalWithoutDiscount < MINORDERVALUE) return toast.error(`Minimum order value is ₹${MINORDERVALUE}`, { id: "order" })
        if (!paymentProofUrl) return toast.error("Please upload the payment proof", { id: "order" })
        try {
            await addDoc(collection(DB, "orders"), {
                items: cartItems,
                cookingReqText: cookingReqText,
                confessionText: confessionText,
                totalWithoutDiscount,
                total,
                selectedAddress,
                platformFee,
                gstAndRestaurantCharges,
                deliveryFee,
                createdAt: Date.now(),
                status: PENDING,
                userId: user.id,
                user: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.emailAddresses?.[0].emailAddress || "",
                    phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
                    avatar: user?.imageUrl,
                    id: user.id,
                    username: user?.username || ""
                },
                paymentProofUrl
            })

            dispatch(clearCart())
            toast.success("Order placed successfully", { id: "order" })
            router.replace("/orders")

        }
        catch (error) {
            console.log(error.message)
            toast.error("Something went wrong", { id: "order" })
        }
    }

    const handleUPIPaymentClick = () => {
        window.location.href = generateUPIPaymentUrl(total);
      };


    return (
        <section className="min-h-[calc(100vh_-_60px)] bg-[#F6F7FA] pb-20">
            <header className="bg-white rounded-b-2xl overflow-hidden shadow-lg p-1 sticky top-0"  >
                <div className="flex items-center px-5 py-3 pt-16 ">
                    <Link href={"/cart"}>
                        <ChevronLeft size={24} className="text-[#292C35] cursor-pointer" />
                    </Link>
                    <h1 className="font-lato font-bold text-[#292C35] text-2xl ml-2">Payment</h1>
                </div>
                <div className="pl-10 flex items-center space-x-1 bg-[#DFFBEF] rounded-b-xl py-1 mt-4">
                    <Image src={"/icons/love.svg"} width={16} height={16} alt="love" />
                    <p className="font-lato  text-[#379674] text-sm">Your are just 2 steps away from placing order </p>
                </div>
            </header>
            <main className="px-5 w-full">
                <h2 className=" border border-[#CECECE] bg-white mt-10 font-lato text-base rounded-2xl py-3 px-5" style={{ boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.14)" }}>
                    ⛳  Step (1/2)
                </h2>

                <div onClick={ handleUPIPaymentClick} className="mt-16 border-primary mx-auto w-fit bg-[#EFE2E5] flex items-center space-x-2 px-4 py-2 rounded-lg border">
                    <p className=" text-primary font-lato text-base">Pay ( Rs {total}) using UPI</p>
                    <Image src={"/icons/rightTriangle.svg"} width={8} height={8} alt="go" />
                </div>

                <div className="mx-auto my-8 flex items-center text-gray-500 space-x-2 ">
                    <div className=" border-b border-[#AAA] flex-1" />
                    <p className="font-lato text-base text-[#AAA]">OR</p>
                    <div className="border-b border-[#AAA] flex-1" />
                </div>
                <div className=" mx-auto space-y-5">
                    <p className=" text-primary font-lato text-base text-center">Pay ( Rs {total}) using UPI</p>
                    <QRCode
                        className="mx-auto rounded-lg"
                        value={generateUPIPaymentUrl(total)}
                        size={192}
                        level="H"
                        renderAs={"png"}
                        bgColor="#F6F7FA"
                        imageSettings={{
                            src: "/icons/tlk.png",
                            height: 60,
                            width: 60,
                            excavate: true,
                        }}
                    />

                </div>
                <h2 className="mt-16 border border-[#CECECE] bg-white  font-lato text-base rounded-2xl py-3 px-5" style={{ boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.14)" }}>
                    ⛳  Step (2/2)
                </h2>
                <button
                    onClick={handleUp}
                    className="flex items-center py-2 rounded-md mx-auto mt-16 px-5 bg-[#2A70FA] space-x-2"
                >
                    <Upload size={24} className="text-white" />
                    <p className="text-white">Upload</p>
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </main>
        </section>
    )
}
