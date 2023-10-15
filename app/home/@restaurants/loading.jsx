import { createArray } from "@/app/utils/restaurant";

export default function loading() {
    return (
        <main className="py-2 last:pr-5 snap-x snap-mandatory items-start flex space-x-4 overflow-x-scroll no-scrollbar pb-8">
            {createArray(6).map((_, index) => (
                <div className="animate-pulse first-of-type:ml-5 object-cover flex-col mt-1 ml-2 bg-blue-gray-200 rounded-lg  w-[82px] h-[82px]" key={index} />
            ))}
        </main>
    )
}
