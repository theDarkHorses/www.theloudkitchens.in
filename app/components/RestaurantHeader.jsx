import Link from "next/link";

export default function RestaurantHeader({ restaurant, activeTab }) {
    return (
        <header className="flex items-center first:pl-5 last:pr-5  space-x-5 no-scrollbar overflow-hidden overflow-x-scroll">
            {restaurant?.sections?.map((item) => (
                <Link
                    href={`?tab=${item?.id}`}
                    className={` font-raleway py-4 leading-none text-center font-semibold border-primary text-sm ${item.id == activeTab
                        ? "text-primary border-b"
                        : "text-[#969696]"
                        }`}
                    key={item.id}
                >
                    {item.name}
                </Link>
            ))}
        </header>
    )
}
