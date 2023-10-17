import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    subTotal: 0,
    discount: 0,
    deliveryFee: 0,
    tax: 0,
    donation: 0,
    platformFee: 0,
    restaurantCharges: 0,
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

            const totalPrice = state.items?.reduce((acc, section) => {
                console.log(section);
                return acc + section.quantity * section.totalCost;
            }, 0);

            state.subTotal = totalPrice
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


        }


    },
});


export const { toggleItemWithDelta, toggleDonation, updateItemQuantity, calculateDeliveryFee, calculateGST, calculatePlatformFee, calculateRestaurantCharges, calculateTotal, addCoupon } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;

