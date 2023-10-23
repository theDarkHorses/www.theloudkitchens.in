import { ChevronLeft } from "lucide-react";
import React from "react";
import CouponCard from "../components/CouponCard";
import Link from "next/link";
import { couponsCollectionRef } from "../firebaseConfig";
import { getDocs } from "firebase/firestore";

const getCoupons = async () => {
  const allCoupons = await getDocs(couponsCollectionRef);
  return allCoupons?.docs.map((doc) => ({ name: doc.id, ...doc.data() }));
};

const layout = async () => {
  const coupons = await getCoupons();
  console.log(coupons);
  return (
    <div>
      <header className="bg-white rounded-b-2xl shadow-md flex flex-col px-5">
        <div className="flex items-start space-x-3 pt-12 mb-8">
          <Link href={"/cart"}>
            <ChevronLeft size={24} />
          </Link>
          <div className="">
            <p className="font-lato text-xl font-bold leading-none">Coupons</p>
            <p className="font-lato text-[#888] text-xs font-bold">
              CartValue: ₹440
            </p>
          </div>
        </div>
        <form className="relative pb-5">
          <input
            className="font-lato  placeholder:text[#949494] py-3 pl-4 border rounded-xl w-full"
            placeholder="Enter your code here"
            type="text"
          />
          <button className="absolute top-4 right-4 font-lato text-[#C2C2C2]">
            Apply
          </button>
        </form>
      </header>
      <main className="px-5 py-12 space-y-10">
        {coupons?.map(
          ({ name, discount, maxDiscount, minValue, date,valid }, index) => {
            return (
              <CouponCard
                name={name}
                discount={discount}
                maxDiscount={maxDiscount}
                minValue={minValue}
                date={date}
                valid={valid}
                key={index}
              />
            );
          }
        )}
      </main>
    </div>
  );
};

export default layout;
