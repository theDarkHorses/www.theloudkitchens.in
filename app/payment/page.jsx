"use client"

import { ChevronLeft, Upload, Image as Photo, X } from "lucide-react"
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
import { PENDING } from "../utils/constants";
import { useRouter } from "next/navigation";
import { roundWithPrecision } from "../utils/delivery";


export default function page() {
    const total = useSelector(selectTotal)
    const { imageUrl, uploadImage } = useFirebaseStorage();
    const fileInputRef = useRef(null);
    const [uid] = useState(uuid());
    const [fileName, setFileName] = useState("");
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
    const [activeTab, setActiveTab] = useState(0)
    const [activeStep, setActiveStep] = useState(0)



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
            setFileName(newFile.name);
        } catch (err) {
            toast.error("Error uploading image. Please try again.");
        }
    };

    const handleCheckout = async (paymentProofUrl) => {
        if (!cartItems?.length) return toast.error("No items added", { id: "order" })
        if (!selectedAddress) return toast.error("Please select an address", { id: 'order' })
        if (totalWithoutDiscount < 200) return toast.error("Minimum order value is ₹200", { id: "order" })
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

    const handleCancelFile = () => setFileName("");

    const handlePlaceOrder = async () => {
        try {
            if (imageUrl && fileName) {
                try {
                    handleCheckout(imageUrl)
                } catch (error) {
                    console.log(error.message)
                }
            } else {
                toast.error("Please upload the payment proof", { id: "order" })
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <section className="min-h-[calc(100vh_-_60px)] bg-[#F6F7FA] pb-20">
            <header className="bg-white rounded-b-2xl overflow-hidden shadow-lg p-1 sticky top-0" style={{ boxShadow: "0px 1px 13px 0px #0000002B" }} >
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
            <main className="w-full pr-8 pl-6 ">
                <div className="mt-16 border-l  border-[#999999] relative ">
                    <div className="absolute -top-2 -left-4 p-2 flex items-center outline outline-4 outline-[#F6F7FA] justify-center border-primary border rounded-full bg-[#EFE2E5] aspect-square w-8 h-8 text-primary">
                        <p> 1</p>
                    </div>
                    <div className="relative -top-1 left-6 pr-3">
                        <div className="flex items-center justify-between">
                            <p className="font-raleway text-base font-semibold "> Make Payment </p>
                            <div onClick={() => setActiveStep(0)} className="flex items-center space-x-2 cursor-pointer">
                                <p className="text-primary underline text-xs truncate">Show payment details</p>
                                <Image src={"/icons/horizontalTriangle.svg"} className="-rotate-90" alt="triangle" width={6} height={6} />
                            </div>
                        </div>
                        <div className={` transition-all duration-300 ease-linear overflow-hidden ${activeStep == 0 ? "h-fit" : "h-0 "}`}>
                            <div className="border-b cursor-pointer flex justify-between font-lato font-bold items-center text-sm mt-10 ">
                                <p onClick={() => setActiveTab(0)} className={` py-2 cursor-pointer   ${activeTab == 0 ? "text-primary border-b border-primary" : ""}`}>Pay using UPI</p>
                                <p onClick={() => setActiveTab(1)} className={` py-2 ${activeTab == 1 ? "text-primary border-primary border-b" : ""}`}>Pay Using QR Code</p>
                            </div>
                            <div onClick={handleUPIPaymentClick} className={`mt-12 border-primary mx-auto w-fit bg-[#EFE2E5] flex items-center space-x-2 px-4 py-4 rounded-lg border ${activeTab == 0 ? "block" : "hidden"}`}>
                                <p className=" text-primary font-lato text-base">Pay ( Rs {roundWithPrecision(total)}) using UPI</p>
                                <Image src={"/icons/rightTriangle.svg"} width={8} height={8} alt="go" />
                            </div>
                            <div className={`mx-auto space-y-5 mt-8 pb-4 ${activeTab == 1 ? "block" : "hidden"}`}>
                                <p className=" text-primary font-lato text-base text-center">Pay ( Rs {roundWithPrecision(total)}) using UPI</p>
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
                            <button onClick={() => setActiveStep(1)} className="text-primary text-base flex items-center space-x-1 mt-10">
                                <p>  Continue</p>
                                <Image src={"/icons/horizontalTriangle.svg"} alt="triangle" width={6} height={6} />

                            </button>
                        </div>
                    </div>
                </div>
                <div className="py-5 pb-6 border-l border-[#999999] relative ">
                    <div className="absolute top-10 -left-4 p-2 flex items-center outline outline-4 outline-[#F6F7FA] justify-center border-primary border rounded-full bg-[#EFE2E5] aspect-square w-8 h-8 text-primary">
                        <p> 2</p>
                    </div>
                    <div className="relative top-6 left-6 pr-3">
                        <div className="flex items-center justify-between">
                            <p className="font-raleway text-base font-semibold "> Upload Screenshot </p>
                        </div>
                        <div className={`overflow-hidden  ${activeStep == 1 ? "h-full" : "h-0"}`}>
                            {!fileName ? <>
                                <button
                                    style={{ boxShadow: "0px 0px 40px 0px #00000021" }}
                                    onClick={handleUp}
                                    className="flex border items-center py-2 rounded-md mx-auto my-8 px-5 bg-white space-x-2"
                                >
                                    <Upload size={24} className="text-primary font-lato " />
                                    <p className="text-primary">Upload payment proof</p>
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </> : <div
                                className="flex border items-center py-2 rounded-md mx-auto w-fit my-8 px-5 bg-white space-x-2"
                            >
                                <Photo size={24} className="text-primary font-lato " />
                                <div className="flex items-center space-x-2 divide-x-[0.5px] divide-[#555555]">
                                    <p className="text-primary capitalize max-w-[100px] overflow-hidden overflow-ellipsis">{fileName}</p>
                                    <div className="pl-2" onClick={handleCancelFile}>
                                        <X size={20} className="text-[#555555] cursor-pointer " />
                                    </div>

                                </div>

                            </div>}

                        </div>


                    </div>
                </div>
            </main>
            <footer>
                <button onClick={handlePlaceOrder} className="fixed bottom-0 left-0 right-0 rounded-t-xl z-50 bg-primary text-white w-full py-5 font-lato text-lg">Place My order</button>
            </footer>
        </section>
    )
}

