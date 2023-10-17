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
            const { item, delta, selectedItems } = action.payload;
            const index = state.items.findIndex((cartItem) => cartItem.id === item.id);
            if (index === -1) {
                state.items.push({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    imgUrl: item.imgUrl,
                    categories: item.categories,
                    isAvailable: item.isAvailable,
                    quantity: delta,
                    selectedItems,
                })
            }
            else {
                if (state.items[index].quantity + delta > 0) {
                    state.items[index].quantity += delta;
                } else {
                    state.items.splice(index, 1);
                }
            }

            const totalPrice = state.items?.reduce((acc, section) => {
                console.log(section);
                return acc + section.quantity * Object.values(section.selectedItems).reduce((acc, item) => {
                    return acc + Object.values(item).reduce((acc, item) => {
                        return acc + item.quantity * item.item.price;
                    }, 0);
                }, 0);
            }, 0);

            state.subTotal = totalPrice
        },


    },
});


export const { toggleItemWithDelta, toggleDonation, calculateDeliveryFee, calculateGST, calculatePlatformFee, calculateRestaurantCharges, calculateTotal, addCoupon } = cartSlice.actions;
export default cartSlice.reducer;


