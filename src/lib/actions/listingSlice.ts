"use client"
import { IListing } from '@/types/listing';
import { createSlice } from '@reduxjs/toolkit';

const initialState:IListing|null =null
// Create a slice
export const listingSlice = createSlice({
    name: 'listing',
    initialState:initialState,
    reducers: {
        getAListing:()=>{
            
        }
    },
});

// Export the actions
export const { } = listingSlice.actions;

// Export the reducer
export default listingSlice.reducer;
