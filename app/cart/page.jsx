"use client";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  PlusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import love from "../../public/icons/love.svg";
import watch from "../../public/icons/watch.svg";
import cute from "../../public/icons/cute.svg";
import offer from "../../public/icons/offer.svg";
import bill from "../../public/icons/bill.svg";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateItemQuantity } from "../store/cartSlice";
import Link from "next/link";

const page = () => {
  const cartItems = useSelector(selectCartItems);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isConfession, setIsConfession] = useState(false);
  const [cookingReq, setCookingReq] = useState(false);
  const [cookingReqText, setCookingReqText] = useState("");
  const [confessionText, setConfessionText] = useState("");
  return (
    <div className="bg-[#E0E1E7]">
      <header className="bg-white rounded-b-2xl overflow-hidden">
        <div className="pt-10 pb-[2px] ">
          <div
            onClick={() => router.back()}
            className="flex items-center mb-6 space-x-2"
          >
            <ChevronLeft className="cursor-pointer" />
            <h2 className="font-lato text-xl font-bold">Your FoodBasket</h2>
          </div>
          <div className="bg-[#DFFBEF] flex items-center space-x-1 rounded-b-2xl pl-5">
            <Image src={love} width={22} height={22} alt="love" />
            <h3 className="font-lato text-sm font-bold text-[#379674]">
              ₹ 420.69 Saved!
            </h3>
            <p className="font-lato text-xs text-[#379674]">
              With Free Delivery
            </p>
          </div>
        </div>
      </header>

      <main className="bg-[#E0E1E7] min-h-screen mt-3 pt-4 pb-36 shadow-lg">
        <div className="bg-white rounded-lg shadow-lg shadow-gray-300 mx-2 overflow-hidden">
          <div className="flex items-center space-x-2 pl-5 py-4 border-[#BABABA] border-dashed border-b-[1px] ">
            <Image
              src={watch}
              height={19}
              width={17}
              alt="watch"
              className=""
            />
            <h3 className="font-lato text-sm font-bold">Delivery in 30 mins</h3>
          </div>
          <div className="pb-3">
            <div className="flex items-center justify-between space-x-2 px-5 py-4">
              <h3 className="font-lato text-sm font-bold">
                ❤️ Make this order a confession
              </h3>
              <div
                onClick={() => setIsConfession(!isConfession)}
                className={`flex w-12 h-6 rounded-xl mx-3 ${
                  isConfession
                    ? "bg-gradient-to-r from-[#C50CA7] to-[#350AAF]  justify-end"
                    : "bg-[#FFD8D8] justify-start"
                }`}
              >
                <Image
                  src={isConfession ? love : cute}
                  height={17}
                  width={17}
                  alt="emogi"
                  className="mx-1"
                />
              </div>
            </div>
            <div
              className={`mx-2 ${
                isConfession
                  ? "border-[#A6A6A6] border-[1px] pt-3"
                  : "border-0 h-0 pt-0"
              } rounded-md `}
            >
              <textarea
                onChange={(e) => setConfessionText(e.target.value)}
                rows={8}
                className={` px-4 ${
                  isConfession ? "block " : " hidden"
                } font-lato  text-sm  border-none outline-none  placeholder:text-[#A6A6A6] rounded-md border-[#A6A6A6] border-2 w-full`}
                placeholder="Inscribe your deepest confessions here, like whispers in the night, A long-awaited apology, a wrong set right. Initiate a dialogue, let emotions unfurl, In this sacred space, let your words swirl. Make your message extraordinary, as you embark, On this journey of expression, let your feelings spark."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="pt-[70px]">
          <div className="border-[1px] border-[#CCC]"></div>
          <h3 className="font-raleway font-medium text-[#888] mx-auto relative -top-3 bg-[#E0E1E7] w-fit px-3">
            Item(s) Added
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-lg shadow-gray-300 mx-2 overflow-hidden">
          {cartItems?.length ? (
            cartItems?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between  pl-5 py-4 border-[#BABABA] border-dashed border-b-[1px] "
              >
                <div className="flex flex-col justify-center">
                  <h3 className="font-lato text-sm font-medium">
                    {item?.name}
                    <span className="font-lato font-medium text-sm text-[#777]">
                      (customised)
                    </span>
                  </h3>
                  <Link
                    href={`/restaurants/${item?.restaurantId}?tab=${item?.tabId}&item=${item?.itemId}`}
                    className="text-primary font-lato text-xs flex items-center"
                  >
                    Customise <ChevronRight size={14} className="rotate-90" />
                  </Link>
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
                        dispatch(updateItemQuantity({ id: item?.id, delta: 1 }))
                      }
                      size={16}
                      color="#ac2323"
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="font-lato text-sm truncate text-[14px] font-bold text-[#444]">
                    ₹ {item?.totalCost * item?.quantity}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-5">
              <h3 className="font-lato text-sm font-bold text-[#444]">
                No items added
              </h3>
            </div>
          )}

          <div className="flex items-center justify-between pl-5 py-4 border-[#BABABA] border-dashed border-b-[1px] ">
            <Link href="/" className="font-lato text-sm font-bold text-[#444]">
              Add more items
            </Link>
            <PlusCircle size={18} className="text-[#444] mr-5" />
          </div>
          <div className="pb-3" onClick={() => setCookingReq(!cookingReq)}>
            <div className="flex items-center justify-between pl-5 py-4">
              <h3 className="font-lato text-sm font-bold text-[#444]">
                Add cooking request
              </h3>
              <PlusCircle
                size={18}
                className="text-[#444] mr-5"
              />
            </div>
            <div
              className={`mx-2 ${
                cookingReq ? "border-[#A6A6A6] border-[1px]" : "border-0 h-0"
              } rounded-md`}
            >
              <textarea
                onChange={(e) => setCookingReqText(e.target.value)}
                rows={4}
                className="p-4 leading-none font-lato  text-sm  border-none outline-none  placeholder:text-[#A6A6A6] rounded-md border-[#A6A6A6] border-2 w-full"
                placeholder="Add the cooking instructions ..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="pt-[70px]">
          <Image
            src={offer}
            height={19}
            width={19}
            className="mx-auto mb-3"
            alt="offer img"
          />
          <div className="border-[1px] border-[#CCC]"></div>
          <h3 className="font-raleway font-medium text-[#888] mx-auto relative -top-3 bg-[#E0E1E7] w-fit px-3">
            Eat More, Save More{" "}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-lg shadow-gray-300 mx-2 overflow-hidden">
          <div className="flex items-start justify-between pl-5 py-4 border-[#BABABA] border-dashed border-b-[1px] ">
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
                  Add more items
                </h3>
                <p className="text-[#9BA1C1] font-raleway text-xs font-medium">
                  Code: PKMKB
                </p>
              </div>
            </div>
            <div className="text-primary font-raleway text-xs font-medium mr-6">
              Apply
            </div>
          </div>
          <Link
            href="/coupons"
            className="flex justify-center items-center py-2 font-lato text-xs text-[#707070] "
          >
            View all coupons
            <ChevronRight />
          </Link>
        </div>
        <div className="pt-[70px]">
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
              <p className="">₹ 200</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-lato text-sm text-[#999]">
                Delivery Fee | 0.2 kms
              </p>
              <p className="font-lato text-sm space-x-2">
                <span className="text-[#444] line-through font-bold">
                  ₹ 800
                </span>
                <span className="text-primary">FREE</span>
              </p>
            </div>
            <p className="font-lato text-xs text-[#999] ">
              FREE Delivery on your order!
            </p>
          </div>
          <div className="mx-4 border-[#BABABA] border-dashed border-b-[1px] py-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-lato text-sm text-[#666]  border-[#BABABA] border-dashed border-b-[1px] ">
                Platform fee
              </p>
              <p className="font-lato text-sm space-x-2">
                <span className="text-[#444] line-through font-bold text-xs">
                  ₹ 5
                </span>
                <span className="text-[#444] font-bold ">₹ 3</span>
              </p>
            </div>
            <div className="flex  items-center justify-between">
              <p className="font-lato text-sm text-[#666]  border-[#BABABA] border-dashed border-b-[1px] ">
                GST and Restaurant Charges
              </p>
              <p className="font-lato text-sm font-bold text-[#444]">₹ 200</p>
            </div>
          </div>
          <div className="mx-4 py-5 space-y-2">
            <div className="flex font-lato font-bold text-sm items-center justify-between">
              <p className="">To pay</p>
              <p className="">₹ 200</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
