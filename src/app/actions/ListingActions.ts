"use server"

export const getListings = async()=>{
    const res = await fetch((process.env.NEXT_BACKEND_URL as string) + '/rental', {
        method: 'GET',
        cache: 'no-store',
    })
    return await res.json()

}
