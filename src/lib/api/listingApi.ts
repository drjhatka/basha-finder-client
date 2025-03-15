"use client"
import { emptySplitApi } from './baseApi'

export const listingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        createListing: build.mutation({
            query:(body)=>({
                url:'/rental',
                method:'POST',
                body
                //credentials:'same-origin',
            })
        })
    }),
    overrideExisting: false,
})

export const { useCreateListingMutation } = listingApi
export default listingApi.reducer;
