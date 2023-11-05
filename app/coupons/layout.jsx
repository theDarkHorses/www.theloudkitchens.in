import React from "react";
// import CouponCard from "../components/CouponCard";
import { DB } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import CouponSearch from "../components/CouponSearch";
import { auth } from "@clerk/nextjs";

const getCoupons = async () => {
  const { userId } = auth()
  const couponsRef = collection(DB, "coupons")
  const q = query(couponsRef, where("userId", "in", [userId, ""]));
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
};

const layout = async () => {
  const coupons = await getCoupons();
  return (
    <div>
      <CouponSearch />
      {/* <main className="px-5 py-12 space-y-10">
        {coupons?.map(
          ({ id, discountPercent, maxDiscountValue, minCartValue, validTill, validity }, index) => {
            return (
              <CouponCard
                id={id}
                discountPercent={discountPercent}
                maxDiscountValue={maxDiscountValue}
                minCartValue={minCartValue}
                validTill={validTill}
                validity={validity}
                key={index}
              />
            );
          }
        )}
      </main> */}
    </div>
  );
};

export default layout;
