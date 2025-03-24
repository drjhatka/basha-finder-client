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
            query:(params)=>'/request/landlord/'+params.id +"/"+params.status,   
        }),
        
        createRequest: build.mutation({
            query:(body)=>({
                url:'/request',
                method:'POST',
                body
                //credentials:'same-origin',
            })
        }),
        updateRequest: build.mutation({
            query:({id, body})=>({
                url:'/request/'+id,
                method:'PATCH',
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

export const { useCreateRequestMutation,useGetAllRequestsQuery, useUpdateRequestMutation, useCompleteRequestMutation, useGetRequestsByTenantIDQuery, useGetRequestsByLandlordIDQuery, useCancelRequestMutation } = requestApi
export default requestApi.reducer;
