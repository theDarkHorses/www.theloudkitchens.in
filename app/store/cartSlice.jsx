import { createSlice } from '@reduxjs/toolkit';
import { calculateDeliveryFee, calculateGST } from "@/app/utils/delivery"

const initialState = {
    items: [],
    subTotal: 0,
    discount: 0,
    deliveryFee: 0,
    tax: 0,
    donation: 0,
    platformFee: 3,
    restaurantCharges: 20,
    gst: 0,
    total: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleItemWithDelta: (state, action) => {
            const { item, delta, selectedItems, totalCost, restaurantId, tabId, itemId } = action.payload;

            state.items.push({
                id: item.id,
                name: item.name,
                description: item.description,
                imgUrl: item.imgUrl,
                categories: item.categories,
                isAvailable: item.isAvailable,
                quantity: delta,
                selectedItems,
                totalCost,
                restaurantId, tabId, itemId
            })

            const totalPrice = state.items?.reduce((acc, section) => acc + section.quantity * section.totalCost, 0);

            state.subTotal = totalPrice
            state.deliveryFee = calculateDeliveryFee(totalPrice)
            state.gst = calculateGST(totalPrice)
            state.total = totalPrice + state.deliveryFee + state.gst + state.platformFee + state.restaurantCharges
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

            state.subTotal = totalPrice
            state.subTotal = totalPrice
            state.deliveryFee = calculateDeliveryFee(totalPrice)
            state.gst = calculateGST(totalPrice)
            state.total = totalPrice + state.deliveryFee + state.gst + state.platformFee + state.restaurantCharges
        },
        clearCart: (state) => {
            state.items = []
            state.subTotal = 0
            state.deliveryFee = 0
            state.discount = 0
            state.tax = 0
            state.donation = 0
            state.platformFee = 3
            state.restaurantCharges = 20
            state.gst = 0
            state.total = 0

        }



    },
});


export const { toggleItemWithDelta, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;
export const selectSubTotal = (state) => state.cart.subTotal;
export const selectTotal = (state) => state.cart.total;
export const selectPlatformFee = (state) => state.cart.platformFee;
export const selectGSTAndRestaurantCharges = (state) => state.cart.restaurantCharges + state.cart.gst;
export const selectDeliveryFee = (state) => state.cart.deliveryFee;



