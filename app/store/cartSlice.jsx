import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    subTotal: 0,
    discount: 0,
    deliveryFee: 0,
    tax: 0,
    donation: 0,
    total: 0,
};

const calculateTotal = (state) => {
    state.total = state.subTotal + state.deliveryFee + state.tax + state.donation - state.discount;
};

const updateItemQuantity = (state, item, quantity) => {
    const existingItemIndex = state.items.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
        const deltaQuantity = quantity - state.items[existingItemIndex].quantity;
        state.items[existingItemIndex].quantity = quantity;
        state.subTotal += item.price * deltaQuantity;
        calculateTotal(state);
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { item, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex((i) => i.id === item.id);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push({ ...item, quantity });
            }
            state.subTotal += item.price * quantity;
            calculateTotal(state);
        },
        removeItem: (state, action) => {
            const { item, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex((i) => i.id === item.id);
            if (existingItemIndex !== -1) {
                const itemQuantity = state.items[existingItemIndex].quantity;
                if (itemQuantity > quantity) {
                    state.items[existingItemIndex].quantity -= quantity;
                    state.subTotal -= item.price * quantity;
                } else {
                    state.subTotal -= item.price * itemQuantity;
                    state.items.splice(existingItemIndex, 1);
                }
                calculateTotal(state);
            }
        },
        updateQuantity: updateItemQuantity,
        applyCoupon: (state, action) => {
            const { code, discount } = action.payload;
            if (code === 'SUMMER2021') {
                state.discount = state.subTotal * discount;
                calculateTotal(state);
            }
        },
        toggleDonation: (state, action) => {
            state.donation = action.payload ? 10 : 0;
            calculateTotal(state);
        },
        calculateDeliveryFee: (state) => {
            const totalOrderPrice = state.subTotal + state.tax + state.deliveryFee - state.discount + state.donation;
            if (totalOrderPrice <= 100) {
                state.deliveryFee = 20;
            } else if (totalOrderPrice <= 200) {
                state.deliveryFee = 10;
            } else {
                state.deliveryFee = 0;
            }
            calculateTotal(state);
        },
        calculateTax: (state, action) => {
            const { taxRate } = action.payload;
            state.tax = state.subTotal * taxRate;
            calculateTotal(state);
        },
    },
});

export const {
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    toggleDonation,
    calculateDeliveryFee,
    calculateTax,
} = cartSlice.actions;

export default cartSlice.reducer;

