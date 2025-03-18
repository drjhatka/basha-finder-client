"use server"

export const getListings = async()=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/rental', {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 30 },
    })
    return await res.json()

}
export const getAListing = async(rentalId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/rental/'+rentalId, {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 30 },
    })
    return await res.json()

}

export const updateListingStatus = async(rentalId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/rental/'+rentalId+"/status", {
        method: 'PUT',
        cache: 'no-store',
        //body:JSON.stringify({availability:'booked'})
    })
    return await res.json()

}
