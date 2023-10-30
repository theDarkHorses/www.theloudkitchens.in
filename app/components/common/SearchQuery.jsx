"use client"

import { useRef, useEffect, useState, use } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { searchCusine } from "@/app/queries/restaurant";
import { extractDebouncedSearchQuery } from "@/app/utils/restaurant";
import Image from "next/image";
import Link from "next/link";

export default function SearchQuery() {
    const searchRef = useRef()
    const [query, setQuery] = useState("")
    const router = useRouter()
    const [isFocused, setIsFocused] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const debouncedQuery = useDebounce(query, 200)

    // useEffect(() => {
    //     searchRef.current?.focus()
    // }, [])

    const handleFocus = () => {
        setTimeout(() => {
            setIsFocused(true)
        }, 200)
    }

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false)
        }, 200)

    }

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const res = await searchCusine(debouncedQuery)
                setSearchResults(extractDebouncedSearchQuery(res))
            } catch (err) {
                console.log(err.message)
            }
        }
        if (debouncedQuery) {
            handleSearch()
        }
    }
        , [debouncedQuery])


    return (
        <header className="border  relative rounded-lg  flex items-center py-2 px-2 mt-10 bg-white  shadow-md shadow-slate-200">
            <ChevronLeft size={24} color="#AC2323" onClick={() => router.back()} className="cursor-pointer" />
            <input
                ref={searchRef}
                className="px-2 leading-none font-lato text-base w-full h-full border-none outline-none"
                placeholder="Search...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {/* {isFocused && ( */}
                <div className="bg-white divide-y left-0 overflow-y-scroll no-scrollbar right-0 max-h-[600px] transition-height  w-full absolute top-12 shadow-lg rounded-lg border">
                    {searchResults.length ? searchResults.map((item) =>
                        <Link onClick={(e) => e.stopPropagation()} href={`/restaurants/${item.restaurantId}?tab=${item.sectionId}&item=${item.itemId}`} key={item.itemId} className="flex px-4 py-4 hover:bg-gray-100  gap-2">
                            <Image src={item.itemImageUrl} alt={item.itemName} width={52} height={52} className="w-12 h-12 rounded-lg overflow-hidden object-cover object-center" />
                            <div className="flex flex-col items-start justify-center">
                                <h3 className="text-[#292C35] font-medium text-start font-lato text-lg ">
                                    {item.itemName}
                                </h3>
                                <p className="font-lato text-xs font-medium text-[#A1A5A8] leading-none">
                                    {item.restaurantName}
                                </p>
                            </div>
                        </Link>
                    ) : <p className="text-center text-text py-2">{!query.trim().length ? "Search Something..." : "No results found"}</p>

                    }
                </div>
            {/* )} */}
        </header>
    )
}
