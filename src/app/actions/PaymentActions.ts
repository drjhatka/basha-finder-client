"use server"

//@ts-expect-error body could be of any type
export const createPayment = async(body)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/payment', {
        method: 'POST',
        cache: 'no-store',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(body)
    })
    return await res.json()

}
export const getAllPaymentsByTenantID = async(tenantId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/payment/tenant/'+tenantId, {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 30 },
    })
    return await res.json()

}

// export const updateListingStatus = async(rentalId:string)=>{
//     const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/rental/'+rentalId+"/status", {
//         method: 'PUT',
//         cache: 'no-store',
//         //body:JSON.stringify({availability:'booked'})
//     })
//     return await res.json()

// }
