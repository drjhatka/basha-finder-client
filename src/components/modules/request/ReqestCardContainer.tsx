"use client"
import {IListing} from "@/types/listing";
import ListingCard from "@/components/modules/listing/ListingCard";
import RequestCard from "./RequestCard";
import { useCancelRequestMutation, useGetRequestsByTenantIdQuery } from "@/lib/api/requestApi";
import { IRequest } from "@/types/request";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IUser } from "@/types";
import { IAuthState } from "@/lib/actions/authSlice";
import { toast } from "sonner";
import { Alert, AlertTitle, Button } from "@mui/material";
// /{requests}:{requests:IRequest[]}
const RequestCardContainer =() => {
    const user =  useSelector((state:RootState) => state.rootReducers.auth );
    
    const {data:requests, isError, isLoading, refetch} = useGetRequestsByTenantIdQuery(user?.userId)
    
    const [cancelRequest]= useCancelRequestMutation()
    
    const handleCancelRequest =async(requestId:string)=>{
        const res = await cancelRequest(requestId)

        if(res){
            refetch()
            toast.error("Request Cancelled")

        }
    }
    return (
    <div className={'grid md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
       {!isLoading && !requests?.data?.length && (
                <Alert sx={{width:'100%'}} severity="info">
                    <AlertTitle>You have not created any requests yet!</AlertTitle>
                    <Button href="/tenant-dashboard" color="error" variant="contained">
                        Create A New Request
                    </Button>
                </Alert>
            )}
        
        {
            !isLoading && requests.data?.map((request:IRequest)=>{
                return <RequestCard handleCancelRequest={handleCancelRequest} key={request._id} request={request}></RequestCard>
            })
        }
        

    </div>
    );
};

export default RequestCardContainer;