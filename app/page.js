import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="flex py-2 px-3 border-[#c2c2c2] rounded-lg border-[1px] items-center space-x-2">
        <Search size={20} className="text-[#AC2318] " />
        <p className="font-raleway font-semibold text-[#999] text-xs">Search for restaurants, cuisines and more... </p>
      </section>
    </>
  )
}
