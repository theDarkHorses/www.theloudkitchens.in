"use client";
import {
  ChevronLeft,
  ChevronRight,
  LocateFixed,
  Minus,
  Plus,
  PlusCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import love from "../../public/icons/love.svg";
import watch from "../../public/icons/watch.svg";
import cute from "../../public/icons/cute.svg";
import offer from "../../public/icons/offer.svg";
import bill from "../../public/icons/bill.svg";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectConfessionText, setCookingReqText, selectDonation, selectCookingReqText, selectSelectedAddress, selectTotalWithoutDiscount, setConfessionText, updateItemQuantity, toggleDonation, selectCoupon, setCouponDetails } from "../store/cartSlice";
import Link from "next/link";
import AddressOverlay from "../components/AddressOverlay";
import {
  selectGSTAndRestaurantCharges,
  selectPlatformFee,
  selectSubTotal,
  selectTotal,
  selectDeliveryFee,
} from "../store/cartSlice";

// import PaymentDrawer from "../components/PaymentDrawer";
import toast from "react-hot-toast";

import { roundWithPrecision } from "../utils/delivery";
import { useRouter } from "next/navigation";
import { DELIVERYFEE, MINORDERVALUE } from "../utils/constants";
import { useAuth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../firebaseConfig";

const page = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPaymentDrawer, setOpenPaymentDrawer] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [isConfession, setIsConfession] = useState(false);
  const [cookingReq, setCookingReq] = useState(false);
  const subTotal = useSelector(selectSubTotal)
  const platformFee = useSelector(selectPlatformFee)
  const gstAndRestaurantCharges = useSelector(selectGSTAndRestaurantCharges)
  const total = useSelector(selectTotal)
  const totalWithoutDiscount = useSelector(selectTotalWithoutDiscount)
  const deliveryFee = useSelector(selectDeliveryFee)
  const [showMore, setShowMore] = useState(null)
  const selectedAddress = useSelector(selectSelectedAddress)
  const router = useRouter()
  const confessionText = useSelector(selectConfessionText)
  const cookingReqText = useSelector(selectCookingReqText)
  const donation = useSelector(selectDonation)
  const { userId } = useAuth()
  const [coupons, setCoupons] = useState([])
  const appliedCoupon = useSelector(selectCoupon)


  const handleShowMore = (index) => {
    setShowMore((prevIndex) => {
      if (prevIndex == index) {
        return null
      }
      return index
    })
  }


  const handleCheckout = async () => {
    toast.loading("Processing...", { id: "order" })
    if (!cartItems?.length) return toast.error("No items added", { id: "order" })
    if (isConfession && !confessionText) return toast.error("Please add a confession", { id: "order" })
    if (!selectedAddress) return toast.error("Please select an address", { id: 'order' })
    if (totalWithoutDiscount < MINORDERVALUE) return toast.error(`Minimum order value is ₹${MINORDERVALUE}`, { id: "order" })
    router.push("/payment")
  }

  const items = useMemo(() => {
    return cartItems.map(item => Object.values(item.selectedItems).map(item => Object.values(item)).flat())
  }, [cartItems])


  useEffect(() => {
    const getCoupons = async () => {
      const couponsRef = collection(DB, "coupons")
      const q = query(couponsRef, where("userId", "in", [userId, ""]));
      const querySnapshot = await getDocs(q)
      setCoupons(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }

    getCoupons()
  }, [])


  const handleApplyCoupon = (couponId) => {
    try {
      toast.loading("Applying coupon...", { id: "coupon" })
      const coupon = coupons.find(coupon => coupon.id === couponId)
      if (!coupon.validity) {
        return toast.error("Coupon expired", { id: "coupon" })
      }

      if (coupon.validTill && coupon.validTill.toMillis() < Date.now()) {
        return toast.error("Coupon expired", { id: "coupon" })
      }
      if (totalWithoutDiscount < coupon.minCartValue) {
        return toast.error("Coupon not applicable to cart value less than ₹" + minCartValue, { id: "coupon" })
      }
      dispatch(setCouponDetails({ ...coupon, userId }))
      toast.success("Coupon applied", { id: "coupon" })

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="bg-[#E0E1E7] relative pb-40 ">
        <header className="bg-white rounded-b-2xl overflow-hidden sticky top-0 z-[9999] ">
          <div className="pt-10 pb-[2px] ">
            <Link href="/"
              className="flex items-center mb-6 space-x-2 px-2"
            >
              <ChevronLeft className="cursor-pointer" />
              <h2 className="font-lato text-xl font-bold">Your FoodBasket</h2>
            </Link>
            <div className="bg-[#DFFBEF] flex items-center space-x-1 rounded-b-2xl px-2">
              <Image src={love} width={22} height={22} alt="love" />
              <h3 className="font-lato text-sm font-bold text-[#379674]">
                ₹ {roundWithPrecision(totalWithoutDiscount - total + DELIVERYFEE - deliveryFee, 2)} Saved!
              </h3>
              {!deliveryFee && <p className="font-lato text-xs text-[#379674]">
                With Free Delivery
              </p>}
            </div>
          </div>
        </header>

        <main className="bg-[#E0E1E7] min-h-screen  pt-10   px-2">
          <div className="bg-white rounded-lg shadow-lg shadow-gray-300 mx-2 overflow-hidden">
            <div className="flex items-center space-x-2 pl-5 py-4 border-[#BABABA] border-dashed border-b-[1px] ">
              <Image
                src={watch}
                height={19}
                width={17}
                alt="watch"
                className=""
              />
              <h3 className="font-lato text-sm font-bold">
                Delivery in 45 mins
              </h3>
            </div>
            <div className="pb-3">
              <div className="flex items-center justify-between space-x-2 px-2 pl-5 py-4">
                <h3 className="font-lato text-sm font-bold">
                  ❤️ Make this order a confession
                </h3>
                <div
                  onClick={() => setIsConfession(!isConfession)}
                  className={`flex w-12 transition-colors cursor-pointer duration-300 h-6 rounded-xl mx-3 ${isConfession
                    ? "bg-gradient-to-r from-[#C50CA7] to-[#350AAF] "
                    : "bg-[#FFD8D8] "
                    }`}
                >
                  <Image
                    src={isConfession ? love : cute}
                    height={17}
                    width={17}
                    alt="emoji"
                    className={`mx-1 transition-all ${isConfession ? "translate-x-6" : "translate-x-0"
                      }`}
                  />
                </div>
              </div>
              <div
                className={`transition-height px-2 duration-300 ease-in-out overflow-hidden  ${isConfession ? " h-48" : "h-0"
                  } rounded-md `}
              >
                <textarea
                  onChange={(e) => dispatch(setConfessionText(e.target.value))}
                  rows={8}
                  value={confessionText}
                  className={` border w-full rounded-lg  font-lato p-4  text-sm outline-none resize-none  placeholder:text-[#A6A6A6] transition-height duration-300 ease-in-out overflow-hidden ${isConfession ? "h-48" : "h-0"
                    }`}
                  placeholder="Inscribe your deepest confessions here, like whispers in the night, A long-awaited apology, a wrong set right. Initiate a dialogue, let emotions unfurl, In this sacred space, let your words swirl. Make your message extraordinary, as you embark, On this journey of expression, let your feelings spark."
                />
              </div>
            </div>
          </div>
          <div className="pt-10">
            <Image
              src={"/icons/pan.png"}
              height={19}
              width={19}
              className="mx-auto mb-3"
              alt="pan img"
            />
            <div className="border-[1px] border-[#CCC]"></div>
            <h3 className="font-raleway font-medium text-[#888] mx-auto relative -top-3 bg-[#E0E1E7] w-fit px-3">
              Item(s) Added
            </h3>
          </div>
          <div className="bg-white rounded-lg shadow-lg divide-[#BABABA] divide-dashed divide-y shadow-gray-300 mx-2 overflow-hidden">
            {cartItems?.length ? (
              cartItems?.map((item, index) => (
                <> <div
                  key={index}
                  className="flex items-center justify-between  pl-5 py-4 "
                >
                  <div className="flex flex-col justify-center">
                    <div className="flex items-start justify-center flex-col sm:flex-row ">
                      <h3 className="font-lato text-sm font-medium inline">
                        {item?.name}
                      </h3>
                      <span className="font-lato self-start font-medium sm:self-center inline text-xs text-[#777]">
                        ( customised )
                      </span>
                    </div>
                    <div
                      onClick={() => handleShowMore(index)}
                      className="text-primary font-lato text-xs flex mt-1 items-center cursor-pointer"
                    >
                      More <ChevronRight size={14} className="rotate-90" />
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center pr-2">
                    <div className="flex items-center  rounded-lg gap-1 px-2 py-1 space-x-2 ml-3 shadow shadow-gray-300 border-[1px] border-gray-500">
                      <Minus
                        onClick={() =>
                          dispatch(
                            updateItemQuantity({ id: item?.id, delta: -1 })
                          )
                        }
                        size={16}
                        color="#ac2323"
                        className="cursor-pointer"
                      />
                      <p className="font-lato font-normal text-base text-primary">
                        {item?.quantity}
                      </p>
                      <Plus
                        onClick={() =>
                          dispatch(
                            updateItemQuantity({ id: item?.id, delta: 1 })
                          )
                        }
                        size={16}
                        color="#ac2323"
                        className="cursor-pointer"
                      />
                    </div>
                    <p className="font-lato text-sm truncate text-[14px] font-bold text-[#444]">
                      ₹ {roundWithPrecision(item?.totalCost * item?.quantity,)}
                    </p>
                  </div>
                </div>
                  <div className={`py-4 space-y-5 overflow-hidden transition-height duration-300 ease-in-out ${index === showMore ? "block" : "hidden"}`}>

                    {items[index].map((item, index) => <div key={index} className="px-4 w-full bg-white space-y-2">

                      <div className="flex items-start space-x-3">
                        <Image src={item?.item?.isVeg ? "/icons/veg.png" : "/icons/nonveg.png"} width={40} height={40} className="w-5 h-5 aspect-square" />
                        <div className="space-y-1">
                          <p className=" text-sm leading-none font-lato text-[#2A3143] font-bold"><span className="text-[#757C8F] text-sm leading-none">{item?.quantity} x</span> {item?.item?.name}</p>
                          <p className=" font-lato text-xs text-[#757C8F]">{item?.item?.quantity}</p>
                        </div>
                      </div>
                    </div>)
                    }
                  </div>
                </>
              ))
            ) : (
              <div className="flex items-center justify-center py-5">
                <h3 className="font-lato text-sm font-bold text-[#444]">
                  No items added
                </h3>
              </div>
            )}
            <Link href="/" className="flex items-center justify-between pl-5 py-4 ">
              <div

                className="font-lato text-sm font-bold text-[#444]"
              >
                Add more items
              </div>
              <PlusCircle size={18} className="text-[#444] mr-5" />
            </Link>
            <div className="pb-3" onClick={() => setCookingReq(!cookingReq)}>
              <div className="flex items-center justify-between pl-5 py-4">
                <h3 className="font-lato text-sm font-bold text-[#444]">
                  Add cooking request
                </h3>
                <PlusCircle
                  size={18}
                  className="text-[#444] mr-5 cursor-pointer"
                />
              </div>
              <div
                className={`mx-2 p-4 transition-all ease-in-out duration-300 rounded-lg border ${cookingReq ? "h-40" : "h-0 py-0 border-0"
                  } rounded-md`}
              >
                <textarea
                  onChange={(e) => dispatch(setCookingReqText(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  value={cookingReqText}
                  rows={4}
                  className="mx-1 resize-none transition-all w-full h-full outline-none border-none"
                  placeholder="Add the cooking instructions ..."
                />
              </div>
            </div>
          </div>
          <div className="pt-10">
            <Image
              src={offer}
              height={19}
              width={19}
              className="mx-auto mb-3"
              alt="offer img"
            />
            <div className="border-[1px] border-[#CCC]"></div>
            <h3 className="font-raleway font-medium text-[#888] mx-auto relative -top-3 bg-[#E0E1E7] w-fit px-3">
              Eat More, Save More
            </h3>
          </div>
          <div className="bg-white rounded-lg shadow-lg shadow-gray-300 mx-2 overflow-hidden">
            {!coupons ? <div className="py-4 border-[#BABABA] border-dashed border-b-[1px]">
              <h3 className="font-lato text-sm font-bold text-[#444] text-center ">
                No coupons available
              </h3>
            </div> : coupons.map(coupon => <div key={coupon.id} className="flex items-start justify-between pl-5 py-4 border-[#BABABA] border-dashed border-b-[1px] ">
              <div className="flex space-x-2">
                <Image
                  src={offer}
                  height={16}
                  width={16}
                  alt="offer"
                  className="h-4 pt-1 "
                />
                <div className="flex flex-col">
                  <h3 className="font-lato text-sm font-bold text-[#444]">
                    {coupon.discountPercent}% off on min order value of ₹{coupon.minCartValue}
                  </h3>
                  <p className="text-[#9BA1C1] font-raleway text-xs font-medium">
                    Code: {coupon.id}
                  </p>
                </div>
              </div>
              <div className="text-primary font-raleway text-xs font-medium mr-6 cursor-pointer" onClick={() => handleApplyCoupon(coupon.id)}>
                {appliedCoupon.id != coupon.id ? "Apply" : "Applied"}
              </div>
            </div>)}

            <Link
              href="/coupons?from=cart"
              className="flex justify-center items-center py-2 font-lato text-xs text-[#707070] "
            >
              View all coupons
              <ChevronRight size={12} className="self-center" />
            </Link>
          </div>
          <div className="relative rounded-2xl overflow-hidden mx-2 mt-16 " >
            <Image src={"/banner/ind.webp"} width={358} height={129.74} className="rounded-2xl brightness-75 w-full absolute object-cover object-center" alt="banner" />
            <div onClick={(e) => {
              dispatch(toggleDonation())
            }} className="flex items-start relative z-50 text-white px-3 py-4 justify-between gap-2">
              <div className="">
                <h1 className="font-bold text-lg drop-shadow-2xl leading-none"><span className="drop-shadow-2xl">Support  #</span><span className="text-[#ff6400] drop-shadow-2xl inline">Bharat</span>Ke<span className="text-[#00d400] drop-shadow-2xl inline">Veer</span> with us</h1>
                <p className="font-medium text-sm drop-shadow-2xl mt-2">We will match your contribution to our bharat ke veer</p>
                <p className="font-medium mt-5 text-sm underline flex items-center">Learn More <ChevronRight size={16} /></p>
              </div>
              <div className="flex flex-col">
                <input className="accent-primary" type="checkbox" checked={donation} onChange={(e) => null} size={20} />
                <p className="font-lato text-base font-semibold mt-1">₹5</p>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <Image
              src={bill}
              height={19}
              width={19}
              className="mx-auto mb-3"
              alt="offer img"
            />
            <div className="border-[1px] border-[#CCC]"></div>
            <h3 className="font-raleway font-medium text-[#888] mx-auto relative -top-3 bg-[#E0E1E7] w-fit px-3">
              Total & Bill Value
            </h3>
          </div>
          <div className="bg-white rounded-lg shadow-lg shadow-gray-300 mx-2 overflow-hidden">
            <div className="mx-4 border-[#BABABA] border-dashed border-b-[1px] py-4 space-y-2">
              <div className="flex font-lato font-bold text-sm items-center justify-between">
                <p className="">Item Total</p>
                <p className="">₹ {roundWithPrecision(subTotal, 2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-lato text-sm text-[#999]">
                  Delivery Fee
                </p>
                <p className="font-lato text-sm space-x-2">
                  <span className="text-[#444] line-through font-bold">
                    ₹ {DELIVERYFEE}
                  </span>
                  <span className="text-primary">{!deliveryFee ? "FREE" : `₹ ${deliveryFee}`}</span>
                </p>
              </div>
              {!deliveryFee && <p className="font-lato text-xs text-[#999] ">
                FREE Delivery on your order!
              </p>}
            </div>
            <div className="mx-4 border-[#BABABA] border-dashed border-b-[1px] py-5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-lato text-sm text-[#666]  border-[#BABABA] border-dashed border-b-[1px] ">
                  Platform fee
                </p>
                <p className="font-lato text-sm space-x-2">
                  <span className="text-[#444] line-through font-bold text-xs">
                    ₹ {platformFee * 2}
                  </span>
                  <span className="text-[#444] font-bold ">
                    ₹ {platformFee}
                  </span>
                </p>
              </div>
              <div className="flex  items-center justify-between">
                <p className="font-lato text-sm text-[#666]  border-[#BABABA] border-dashed border-b-[1px] ">
                  GST and Restaurant Charges
                </p>
                <p className="font-lato text-sm font-bold text-[#444]">
                  ₹ {roundWithPrecision(gstAndRestaurantCharges, 2)}
                </p>
              </div>
            </div>
            <div className="mx-4 py-5 space-y-2">
              <div className="flex font-lato font-bold text-sm items-center justify-between">
                <p className="">To pay</p>
                <p className="">₹ {roundWithPrecision(total, 2)}</p>
              </div>
            </div>
          </div>
        </main>
        <footer
          className="bg-white shadow  w-full fixed bottom-0 divide-y left-0 space-y-4 right-0 pt-4  z-50 rounded-t-lg overflow-hidden"
          style={{ boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex items-center px-2 justify-between py-2 pb-0  font-lato w-full">
            <div className="flex items-start space-x-3 justify-between">
              <LocateFixed size={24} className="text-primary" />
              <div>
                <p className="text-[#444] text-sm">Delivery at {selectedAddress?.location}</p>
                <p className="text-[#999] text-sm">
                  {selectedAddress?.address}, {selectedAddress?.landmark}
                </p>
              </div>
            </div>
            <p
              onClick={() => setOpenDrawer(true)}
              className="text-primary text-sm self-start cursor-pointer"
            >
              Change
            </p>
          </div>
          <div className=" py-6  px-2 flex justify-between space-x-2">
            <div className=" space-y-1 flex flex-col justify-center items-start cursor-pointer" onClick={() => setOpenPaymentDrawer(true)}>
              <div className="flex items-center space-x-2">
                <span className="text-[#999999] text-xs">Payment Method</span>
                <Image
                  src={"/icons/triangle.svg"}
                  height={10}
                  width={10}
                  alt="triangle"
                />
              </div>
              <div className="space-x-1 flex items-center">
                <Image
                  src={"/icons/bank.svg"}
                  width={12}
                  height={12}
                  alt="bank"
                />
                <span className="font-lato text-[#444] text-xs">
                  Online, UPI
                </span>
              </div>
            </div>
            <button
              className="border-primary border space-x-2 max-w-[175px] w-full bg-[#AC232310] rounded-lg py-2  px-4 flex items-center justify-between"
              onClick={handleCheckout}
            >
              <div className=" flex space-y-1 flex-col items-center">
                <span className="text-sm truncate  font-lato text-primary font-semibold leading-none">
                  ₹ {roundWithPrecision(total, 2)}
                </span>
                <span className=" text-sm  text-[#C57878] self-start font-semibold leading-none">
                  TOTAL
                </span>
              </div>
              <div className="flex items-center space-x-2 ">
                <p className="text-[#AC2323]  text-xs font-lato truncate leading-none font-semibold">
                  Place Order
                </p>
                <Image
                  src={"/icons/horizontalTriangle.svg"}
                  height={6}
                  width={6}
                  alt="chevron"
                />
              </div>
            </button>
          </div>
        </footer>
      </div>
      <AddressOverlay openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      {/* <PaymentDrawer
        openDrawer={openPaymentDrawer}
        setOpenDrawer={setOpenPaymentDrawer}
      /> */}
    </>
  );
};

export default page;
