"use server"
export const getAllUsers = async(query:any)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/user/'+query, {
        method: 'GET',
        cache: 'no-store',
    })
    return await res.json()
}
export const blockUser = async(userId:string)=>{
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/user/'+userId+'/status', {
        method: 'PATCH',
        cache: 'no-store',
    })
    return await res.json()
}