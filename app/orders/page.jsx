import Image from "next/image";
import BackRoute from "../components/common/BackRoute";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";


export const ORDER_MENU = [
  "Order History",
  "My Coupons",
  "Wallet Balance"
]

export default async function page({ searchParams }) {
  const { tab } = searchParams
  const activeTab = tab || 0
  const user = await currentUser()
  return (
    <section className="">
      <BackRoute />
      <header className=" rounded-b-lg overflow-hidden relative mb-4">
        <Image
          src="https://i.imgur.com/rHQ2DwY.jpg"
          className="w-full"
          width={350}
          height={200}
          alt="restaurant"
        />
        <section className="bg-white pb-8">
          <div className="flex flex-col items-center -mt-8">
            <div className="h-[82px] w-[82px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl shadow-lg shadow-gray-300 flex items-center justify-center">
              <Image
                src={user.imageUrl}
                height={78}
                width={78}
                className="border-white border-2 rounded-2xl"
              />
            </div>
            <h2 className="font-lato font-medium text-lg text-center mt-3">
              {user.firstName} {user.lastName}
            </h2>
            <p className="font-lato text-xs text-[#999]">
              O Followers &bull; 0 Following
            </p>
          </div>
        </section>
      </header>

      <div className=" bg-white w-full p-4 pb-0 border-b sticky top-0">
        <header className="flex items-center justify-between space-x-3">
          {ORDER_MENU.map((label, index) => <Link href={`?tab=${index}`} className={` font-raleway py-4 leading-none text-center font-semibold border-primary text-sm ${index == activeTab ? "text-primary border-b" : "text-[#969696]"}`} key={index}>{label}</Link>)}
        </header>
      </div>
    </section>
  )
}
