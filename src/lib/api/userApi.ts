"use client"
import { emptySplitApi } from './baseApi'

export const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        blockUser: build.mutation({
            query:(userId)=>({
                url:'/user/'+userId+"/status",
                method:'PATCH',
                //credentials:'same-origin',
            })
        }),
        
    }),
    overrideExisting: false,
})

export const { useBlockUserMutation,  } = userApi
export default userApi.reducer;
