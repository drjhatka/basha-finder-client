"use client"
import { emptySplitApi } from './baseApi'
import {listingSlice} from "@/app/redux/actions/listingSlice";

export const listingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        createListing: build.mutation({
            query:(body)=>({
                url:'listing',
                method:'POST',
                body
                //credentials:'same-origin',
            })

        })
    }),
    overrideExisting: false,
})

export const { useCreateListingMutation } = listingApi
export default listingSlice.reducer;
