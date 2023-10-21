import Image from "next/image";
import React from "react";
import bank from "../../public/icons/bank.svg";
import credits from "../../public/icons/credits.svg";

const PaymentDrawer = ({ openDrawer, setOpenDrawer }) => {
  return (
    <div
      className={`bg-transparent transition-all duration-300  absolute top-0 bottom-0 left-0 right-0 h-screen w-screen z-[999999] ${
        openDrawer ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="h-screen w-screen bottom-0 right-0  opacity-[0.77] bg-black fixed top-0 left-0 "
        onClick={() => setOpenDrawer(false)}
      />
      <div
        style={{
          height: window.innerHeight * 0.7,
          boxShadow: " 0px 0px 9px 0px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
        className="fixed bg-[#F6F6F6] mt-14  bottom-0 right-0 left-0  w-screen p-4 pt-10  rounded-t-2xl overflow-hidden overflow-y-scroll no-scrollbar"
      >
        <main className="px-2 py-2  rounded-lg divide-y-[1px]">
          <h4 className="font-lato text-[#18191B] font-bold text-xl ">
            Payment Methods
          </h4>
          <div
            className="rounded-[20px] border border-[#CECECE] flex justify-between bg-white py-4 pl-6 pr-5 mt-6 mb-5"
            style={{ boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.14)" }}
          >
            <div className="flex space-x-2 justify-between items-start">
              <Image
                src={bank}
                height={14}
                width={16}
                alt="bank"
                className="pt-1"
              />
              <div className="">
                <h5 className="text-[#1C1C1C] font-raleway text-base font-medium">
                  Online, UPI
                </h5>
                <p className="text-[#9BA1C1] font-lato text-xs font-bold">
                  Save extra when you play online
                </p>
              </div>
            </div>
            <div className="font-raleway text-xs text-primary font-medium">
              Apply
            </div>
          </div>
          <div
            className="rounded-[20px] border border-[#CECECE] flex justify-between bg-white py-4 pl-6 pr-5 mt-6 mb-5"
            style={{ boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.14)" }}
          >
            <div className="flex space-x-2 justify-between items-start">
              <Image
                src={credits}
                height={14}
                width={16}
                alt="bank"
                className="pt-1"
              />
              <div className="">
                <h5 className="text-[#1C1C1C] font-raleway text-base font-medium">
                  Credits{" "}
                </h5>
                <p className="text-[#9BA1C1] font-lato text-xs font-bold">
                  Balance : ₹100{" "}
                </p>
              </div>
            </div>
            <div className="font-raleway text-xs text-primary font-medium">
              Apply
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentDrawer;
