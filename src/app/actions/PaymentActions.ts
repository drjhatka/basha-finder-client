"use server"

export const createPayment = async(body:any)=>{
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
// export const getAListing = async(rentalId:string)=>{
//     const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/rental/'+rentalId, {
//         method: 'GET',
//         cache: 'no-store',
//         next: { revalidate: 30 },
//     })
//     return await res.json()

// }

// export const updateListingStatus = async(rentalId:string)=>{
//     const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/rental/'+rentalId+"/status", {
//         method: 'PUT',
//         cache: 'no-store',
//         //body:JSON.stringify({availability:'booked'})
//     })
//     return await res.json()

// }
