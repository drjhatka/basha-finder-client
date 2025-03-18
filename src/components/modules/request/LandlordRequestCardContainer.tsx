"use client"
import { useCancelRequestMutation} from "@/lib/api/requestApi";
import { IRequest } from "@/types/request";
import { toast } from "sonner";
import { Alert, AlertTitle, Button } from "@mui/material";
import LandlordRequestCard from "./LandlordRequestCard";
import { approveRequest } from "@/app/actions/RequestActions";

const LandlordRequestCardContainer =({requests,isLoading, pendingRefetch, approvedRefetch}:{requests:IRequest[], isLoading:boolean, pendingRefetch:()=>void, approvedRefetch:()=>void}) => {
    const [cancelRequest]= useCancelRequestMutation()
    const handleApprove =async(requestId:string)=>{
        const res = await approveRequest(requestId)
        if(res){
            pendingRefetch()
            approvedRefetch()
            toast.error("Request Approved, Wait 24 hours for payment confirmation!")
        }
    }
    const handleReject =async(requestId:string)=>{
        const res = await cancelRequest(requestId)
        if(res){
            refetch()
            toast.error("Request Cancelled")

        }
    }

    return ( <div className={'grid md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
       {!isLoading && !requests?.length && (
                <Alert sx={{width:'100%'}} severity="info">
                    <AlertTitle>You have no pending requests!</AlertTitle>
                    <Button href="/tenant-dashboard" color="error" variant="contained">
                        Create A New Request
                    </Button>
                </Alert>
            )}
        {
            !isLoading && requests?.map((request:IRequest)=>{
                return <LandlordRequestCard handleApprove={handleApprove} handleReject={handleReject} key={request._id} request={request}></LandlordRequestCard>
            })
        }      
    </div>
    );
};

export default LandlordRequestCardContainer;