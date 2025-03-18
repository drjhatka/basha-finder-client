"use client"
import { emptySplitApi } from './baseApi'

export const requestApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({

        getAllRequests:build.query({
            query:()=>'/request/',    
        }),

        getRequestsByTenantID:build.query({
            query:(params)=>'/request/tenant/'+params.id +"/"+params.status,    
        }),

        getRequestsByLandlordID:build.query({
            query:(tenantId)=>'/request/tenant/',    
        }),
        
        createRequest: build.mutation({
            query:(body)=>({
                url:'/request',
                method:'POST',
                body
                //credentials:'same-origin',
            })
        }),
        completeRequest: build.mutation({
            query:({body, id})=>({
                url:'/request/'+id+"/complete",
                method:'PATCH',
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

export const { useCreateRequestMutation,useGetAllRequestsQuery, useCompleteRequestMutation, useGetRequestsByTenantIDQuery, useGetRequestsByLandlordIDQuery, useCancelRequestMutation } = requestApi
export default requestApi.reducer;
