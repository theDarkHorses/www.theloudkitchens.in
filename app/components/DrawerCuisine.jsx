"use client";
import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleItemWithDelta } from "../store/cartSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid"
import { createArray } from "../utils/restaurant";


export default function DrawerCuisine({ cuisine, setCraftedCuisine, craftedCuisine, restaurantId, tabId, itemId, drawerStatus }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [uid] = useState(uuid())
    const router = useRouter()
    const dispatch = useDispatch()
    const activeCategory = cuisine?.categories?.[activeIndex];
    const isRequired = useMemo(() => activeCategory?.isRequired, [activeCategory]);
    const requiredItems = useMemo(() => activeCategory?.requiredItems, [activeCategory]);

    const totalItems = useMemo(() => {
        return Object.values(craftedCuisine?.[activeIndex] || {}).reduce((total, item) => total + item.quantity, 0);
    }, [craftedCuisine, activeIndex]);



    const handleCheckbox = (checked, categoryIndex, itemIndex, item) => {
        if (checked) {
            if (isRequired && totalItems + 1 > requiredItems) return;

            setCraftedCuisine({
                ...craftedCuisine,
                [categoryIndex]: {
                    ...craftedCuisine[categoryIndex],
                    [itemIndex]: { quantity: 1, item }
                }
            });
        } else {
            delete craftedCuisine[categoryIndex][itemIndex];
            setCraftedCuisine({
                ...craftedCuisine,
                [categoryIndex]: {
                    ...craftedCuisine[categoryIndex],
                }
            });
        }
    }

    const handleQuantity = (categoryIndex, itemIndex, delta) => {
        if (craftedCuisine?.[categoryIndex]?.[itemIndex]) {
            if (isRequired && totalItems + delta > requiredItems) return;

            if (craftedCuisine[categoryIndex][itemIndex].quantity + delta > 0) {
                setCraftedCuisine({
                    ...craftedCuisine,
                    [categoryIndex]: {
                        ...craftedCuisine[categoryIndex],
                        [itemIndex]: {
                            ...craftedCuisine[categoryIndex][itemIndex],
                            quantity: craftedCuisine[categoryIndex][itemIndex].quantity + delta
                        }
                    }
                });
            } else {
                delete craftedCuisine[categoryIndex][itemIndex];
                setCraftedCuisine({
                    ...craftedCuisine,
                    [categoryIndex]: {
                        ...craftedCuisine[categoryIndex],
                    }
                });
            }
        }
    }

    const getTotalCost = useMemo(() => {
        let total = 0;
        Object.values(craftedCuisine).forEach((category) => {
            Object.values(category).forEach((item) => {
                total += item.quantity * item.item.price;
            });
        });
        return total;
    }, [craftedCuisine]);

    const handleAddToBasket = () => {
        if (!cuisine?.isAvailable) return toast.error("This item is not available", { id: "add-to-basket" })
        toast.loading("Adding to basket...", { id: "add-to-basket" })
        let canProceed = true;
        cuisine?.categories?.forEach((category, categoryIndex) => {
            if (category.isRequired) {
                const total = Object.values(craftedCuisine?.[categoryIndex] || {}).reduce((total, item) => total + item.quantity, 0);
                if (total !== category.requiredItems) {
                    canProceed = false;
                }
            }
        }
        );
        if (canProceed) {
            dispatch(toggleItemWithDelta({ id: uid, item: cuisine, delta: 1, selectedItems: craftedCuisine, totalCost: getTotalCost, restaurantId, tabId, itemId }))
            setActiveIndex(0)
            setCraftedCuisine({})
            toast.success("Added to basket", { id: "add-to-basket" })
            router.push("/cart")
        } else {
            toast.error("Please select min no. of items indicated in the brackets.", { id: "add-to-basket" })
        }

    };

    useEffect(() => {
        if (drawerStatus) {
            // using a loop set the craftedCuisine if the category of the cusiine is required and the craftedCuisine is empty
            const newCraftedCuisine = {}
            cuisine?.categories?.forEach((category, categoryIndex) => {
                if (category.isRequired) {
                    // create a circular loop of the required items if while traversing the category the no of items is less than the required items then start from the beginning and increment the quantity of the items
                    const items = createArray(category.requiredItems)
                    newCraftedCuisine[categoryIndex] = {}
                    items.forEach((item, itemIndex) => {
                        const circularIndex = (itemIndex + category?.items?.length) % category?.items?.length
                        if (itemIndex < category?.items?.length) {
                            newCraftedCuisine[categoryIndex][circularIndex] = { quantity: 1, item: cuisine?.categories?.[categoryIndex]?.items?.[circularIndex] }
                        } else {
                            const againItem = newCraftedCuisine[categoryIndex][circularIndex]
                            newCraftedCuisine[categoryIndex][circularIndex] = { quantity: againItem.quantity + 1, item: againItem.item }

                        }
                    }

                    );
                }
            }
            );
            setCraftedCuisine({ ...craftedCuisine, ...newCraftedCuisine })
        }

    }, [drawerStatus, cuisine])




    return (
        <Fragment>
            <div className=" bg-white py-1 mx-2 rounded-lg space-y-5 pb-8">
                <Image
                    src={cuisine?.imageUrl}
                    width={300}
                    height={250}
                    className="rounded-lg aspect-video  mx-auto w-full object-cover object-center"
                    alt="banner"
                />
                <div className="px-2 flex space-x-2 pl-4">
                    <Image
                        alt={cuisine?.isVeg ? "veg" : "nonveg"}
                        src={cuisine?.isVeg ? "/icons/veg.png" : "/icons/nonveg.png"}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                    />
                    <div className="flex items-center space-x-2">
                        <h1 className="font-raleway text-lg font-bold leading-none">
                            {cuisine?.name}
                        </h1>
                        <p className="text-yash font-lato font-bold leading-none">
                            🔥 +{cuisine?.kCal} Kcal
                        </p>
                    </div>
                </div>
            </div>

            <div className=" py-4 pb-2 w-full items-center ">
                <div className="w-full flex-1 mx-2 py-2  flex justify-start text-sm items-center space-x-4">
                    {cuisine?.categories?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`cursor-pointer text-base font-semibold font-raleway border-primary ${activeIndex == index ? "border-b-2 text-primary" : ""
                                }`}
                        >
                            {item.name} {item.isRequired && "(" + item.requiredItems + ")"} {item.isRequired && <span className="text-red-600">*</span>}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-lg py-6  flex-1">
                <div className="flex justify-between items-center  px-2  pt-2 pb-5 rounded-lg">
                    <p className="font-bold font-raleway text-base">{isRequired ? "Select up-to " + requiredItems : "Select your favorite items:"}</p>
                    {isRequired && <p className="font-lato text-base">
                        ( {totalItems} / {requiredItems} )
                    </p>}
                </div>
                <div className="px-2 space-y-2">
                    {cuisine?.categories[activeIndex]?.items?.map((item, index) => (
                        <div
                            className="flex justify-between items-center   space-x-2"
                            key={index}
                        >
                            <div className="font-lato font-normal">
                                <div className="flex items-center space-x-2">
                                    <input
                                        id={"checkbox" + index}
                                        type="checkbox"
                                        size={20}
                                        color="green"
                                        checked={craftedCuisine?.[activeIndex]?.[index] ? true : false}
                                        onChange={(e) => handleCheckbox(e.target.checked, activeIndex, index, item)}
                                        className="w-5 accent-green-600 h-5 font-semibold rounded-full aspect-square"
                                    />
                                    <label
                                        htmlFor={"checkbox" + index}
                                        className="font-lato font-normal text-sm text-[#444444]"
                                    >
                                        {item?.name}
                                    </label>
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (!craftedCuisine?.[activeIndex]?.[index]?.quantity) {
                                        handleCheckbox(true, activeIndex, index, item)
                                    }
                                }}
                                className={`${craftedCuisine?.[activeIndex]?.[index] ? "bg-[#ac232320] text-primary" : "bg-[#F8F8F8] text-gray-600"} text-sm flex items-center  rounded-lg gap-1 px-2 py-1 space-x-2`}>
                                <Minus size={14} className="cursor-pointer" onClick={() => handleQuantity(activeIndex, index, -1)} />
                                <p className="font-lato font-normal text-xl ">
                                    {craftedCuisine[activeIndex]?.[index]?.quantity || 0}
                                </p>
                                <Plus size={14} className="cursor-pointer" onClick={() => handleQuantity(activeIndex, index, 1)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white sticky bottom-0 z-[99999] flex justify-end  w-full shadow-md shadow-black ">
                <button className={`py-3 px-5  text-white rounded-lg mx-1 my-4 ${totalItems ? "bg-primary" : "bg-[#757575]"}`} onClick={totalItems ? handleAddToBasket : null}>
                    Add To Basket ( {getTotalCost}rs)
                </button>
            </div>

        </Fragment>
    )
}
