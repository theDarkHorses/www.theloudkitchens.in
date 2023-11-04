import { createSlice, current } from "@reduxjs/toolkit";
import { calculateDeliveryFee, calculateGST, roundWithPrecision } from "@/app/utils/delivery";
import { DELIVERYFEE } from "../utils/constants";

const initialState = {
    items: [],
    subTotal: 0,
    discount: 0,
    deliveryFee: DELIVERYFEE,
    tax: 0,
    donation: 5,
    platformFee: 3,
    restaurantCharges: 20,
    gst: 0,
    total: 0,
    totalWithoutDiscount: 0,
    selectedAddress: null,
    coupon: {
        id: null,
        discountPercent: 0,
        maxDiscountValue: 0,
        minCartValue: 0,
        validTill: null,
        validity: 0,
        userId: "",
    },
    cookingReqText: "",
    confessionText: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleItemWithDelta: (state, action) => {
            const {
                item,
                delta,
                id,
                selectedItems,
                totalCost,
                restaurantId,
                tabId,
                itemId,
            } = action.payload;
            state.items.push({
                id: id,
                name: item.name,
                isVeg: item.isVeg,
                description: item.description,
                imageUrl: item.imageUrl,
                categories: item.categories,
                isAvailable: item.isAvailable,
                quantity: delta,
                selectedItems,
                totalCost,
                restaurantId,
                tabId,
                itemId,
            });

            const totalPrice = state.items?.reduce(
                (acc, section) => acc + section.quantity * section.totalCost,
                0
            );

            state.subTotal = totalPrice;
            state.deliveryFee = calculateDeliveryFee(totalPrice);
            state.gst = calculateGST(totalPrice);
            const totalWithoutDiscount =
                totalPrice +
                state.deliveryFee +
                state.gst +
                state.platformFee +
                state.restaurantCharges;
            state.totalWithoutDiscount = totalWithoutDiscount;
            state.total = totalWithoutDiscount - state.discount;
            if (!state.items) {
                state = state.total = 0;
            }
        },

        updateItemQuantity: (state, action) => {
            const { id, delta } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item.quantity + delta > 0) {
                item.quantity += delta;
            } else {
                state.items = state.items.filter((item) => item.id !== id);
            }

            const totalPrice = state.items?.reduce((acc, section) => {
                return acc + section.quantity * section.totalCost;
            }, 0);

            state.subTotal = totalPrice;
            state.subTotal = totalPrice;
            state.deliveryFee = calculateDeliveryFee(totalPrice);
            state.gst = calculateGST(totalPrice);
            const totalWithoutDiscount =
                totalPrice +
                state.deliveryFee +
                state.gst +
                state.platformFee +
                state.restaurantCharges;

            state.totalWithoutDiscount = totalWithoutDiscount;
            state.total = totalWithoutDiscount - state.discount;

            if (state.items.length === 0) state.total = 0;

        },
        clearCart: (state) => {
            state.items = [];
            state.subTotal = 0;
            state.deliveryFee = DELIVERYFEE;
            state.discount = 0;
            state.tax = 0;
            state.donation = 0;
            state.platformFee = 3;
            state.restaurantCharges = 20;
            state.gst = 0;
            state.total = 0;
            state.totalWithoutDiscount = 0;
            state.confessionText = "";
            state.cookingReqText = "";
            state.coupon = {
                id: null,
                discountPercent: 0,
                maxDiscountValue: 0,
                minCartValue: 0,
                validTill: null,
                validity: 0,
                userId: "",
            };
        },
        setCouponDetails: (state, action) => {
            state.coupon = action.payload;
            state.discount = roundWithPrecision(Math.min(
                state.coupon.maxDiscountValue,
                state.totalWithoutDiscount * (state.coupon.discountPercent / 100)
            ), 2);
            state.total = state.totalWithoutDiscount - state.discount;

        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        setConfessionText: (state, action) => {
            state.confessionText = action.payload;
        },
        setCookingReqText: (state, action) => {
            state.cookingReqText = action.payload;
        },
        toggleDonation: (state) => {
            if (state.donation) {
                state.donation = 0;
            } else {
                state.donation = 5;
            }
            state.total = state.totalWithoutDiscount - state.discount + state.donation;
            if (state.items.length === 0) state.total = 0;
        }

    },
});

export const { toggleItemWithDelta, toggleDonation, setConfessionText, setCookingReqText, setSelectedAddress, updateItemQuantity, clearCart, setCouponDetails } =
    cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;
export const selectSubTotal = (state) => state.cart.subTotal;
export const selectTotal = (state) => state.cart.total;
export const selectTotalWithoutDiscount = (state) => state.cart.totalWithoutDiscount;
export const selectPlatformFee = (state) => state.cart.platformFee;
export const selectGSTAndRestaurantCharges = (state) =>
    state.cart.restaurantCharges + state.cart.gst;
export const selectDeliveryFee = (state) => state.cart.deliveryFee;
export const selectCoupon = (state) => state.cart.coupon;
export const selectSelectedAddress = (state) => state.cart.selectedAddress;
export const selectCookingReqText = (state) => state.cart.cookingReqText;
export const selectConfessionText = (state) => state.cart.confessionText;
export const selectDonation = (state) => state.cart.donation;