"use server"

export const getRequests = async()=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/request/', {
        method: 'GET',
        cache: 'no-store',
    })
    return await res.json()
}

export const approveRequest = async(requestId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/request/'+requestId+"/approve", {
        method: 'PATCH',
        cache: 'no-store',
    })
    return await res.json()
}
export const completeRequest = async(requestId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/request/'+requestId+"/complete", {
        method: 'PATCH',
        cache: 'no-store',
    })
    return await res.json()
}
export const rejectRequest = async(requestId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/request/'+requestId, {
        method: 'DELETE',
        cache: 'no-store',
    })
    return await res.json()
}
