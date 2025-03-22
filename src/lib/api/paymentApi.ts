"use client"
import { emptySplitApi } from './baseApi'

export const paymentApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPaymentsByTenantID: build.query({
            query:(tenantId)=>({
                url:'/payment/tenant/'+tenantId,
                method:'GET',
            })
        }),
        
    }),
})

export const { useGetPaymentsByTenantIDQuery  } = paymentApi
export default paymentApi.reducer;
