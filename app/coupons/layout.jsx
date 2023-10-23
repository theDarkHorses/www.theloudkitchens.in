import React from "react";
import CouponCard from "../components/CouponCard";
import { couponsCollectionRef } from "../firebaseConfig";
import { getDocs } from "firebase/firestore";
import CouponSearch from "../components/CouponSearch";

const getCoupons = async () => {
  const allCoupons = await getDocs(couponsCollectionRef);
  return allCoupons?.docs.map((doc) => ({ name: doc.id, ...doc.data() }));
};

const layout = async () => {
  const coupons = await getCoupons();
  return (
    <div>
      <CouponSearch />
      <main className="px-5 py-12 space-y-10">
        {/* {coupons?.map(
          ({ name, discount, maxDiscount, minValue, date, valid }, index) => {
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
        )} */}
      </main>
    </div>
  );
};

export default layout;
