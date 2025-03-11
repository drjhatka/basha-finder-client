"use client"
import { createSlice } from '@reduxjs/toolkit';


// Create a slice
export const listingSlice = createSlice({
    name: 'listing',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Export the actions
export const { increment, decrement, incrementByAmount } = listingSlice.actions;

// Export the reducer
export default listingSlice.reducer;
