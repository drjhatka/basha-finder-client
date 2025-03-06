"use server"

export const getRequests = async()=>{
    const res = await fetch((process.env.NEXT_BACKEND_URL as string) + '/request', {
        method: 'GET',
        cache: 'no-store',
    })
    return await res.json()
}
