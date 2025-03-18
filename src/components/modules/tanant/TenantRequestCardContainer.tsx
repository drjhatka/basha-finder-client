"use client"
import { useCancelRequestMutation } from "@/lib/api/requestApi";
import { IRequest } from "@/types/request";
import { toast } from "sonner";
import MUIDataAlert from "@/components/shared/DataAlert";
import TenantRequestCard from "./TenantRequestCard";
import { Grid } from "@material-ui/core";
//import { Grid } from "@material-ui/core";


const TenantRequestCardContainer = ({ requests, isLoading, refetch }:
    { requests: IRequest[], isLoading: boolean, refetch: () => void }) => {

    const [cancelRequest] = useCancelRequestMutation()

    const handleCancelRequest = async (requestId: string) => {
        await cancelRequest(requestId)
        toast.error('Request Cancelled')
        refetch()
    }

    return (
        <Grid container >
            
            {!isLoading && !requests?.length && <MUIDataAlert  title="No Requests available" button={true} btnHref="/tenant-dashboard/" btnTxt="Create A Booking" />}
            
            {
                !isLoading && requests?.map((request: IRequest) => {
                    return <TenantRequestCard key={request._id} request={request} handleCancelRequest={handleCancelRequest} />
                })
            }
        </Grid>
    );
};

export default TenantRequestCardContainer;