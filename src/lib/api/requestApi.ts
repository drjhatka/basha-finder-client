"use client"
import { emptySplitApi } from './baseApi'

export const requestApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getRequestsByTenantId:build.query({
            query:(tenantId)=>'/request/tenant/'+tenantId,    
        }),
        createRequest: build.mutation({
            query:(body)=>({
                url:'/request',
                method:'POST',
                body
                //credentials:'same-origin',
            })
        }),
        cancelRequest: build.mutation({
            query:(requestId)=>({
                url:'/request/'+requestId,
                method:'DELETE',
            })
        })
    }),
    overrideExisting: false,
})

export const { useCreateRequestMutation, useGetRequestsByTenantIdQuery, useCancelRequestMutation } = requestApi
export default requestApi.reducer;
