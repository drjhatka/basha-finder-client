"use client"
import { Card, CardContent, Typography, CardActions, Button, Divider, Chip, Stack, Grid2 } from "@mui/material";
import { IRequest } from "@/types/request";
import { ApprovalRounded, CalendarMonth, Message } from "@mui/icons-material";
import { MinusCircle } from "lucide-react";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

interface RequestCardProps {
    request: IRequest;
    handleApprove:(requestId:string)=>void
    handleReject:(requestId:string)=>void
}

const LandlordRequestCard: React.FC<RequestCardProps> =({ request, handleApprove, handleReject }) => {
    const data = useContext(DataContext)
    const listings = data?.listingData
    const linkedListing = listings?.find(item=>item._id==request.listingId)
    return (
        <Card sx={{ maxWidth: 400, borderRadius: 1, border:2, boxShadow: 5, p: 2, bgcolor: "whitesmoke" }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    Rental Request {linkedListing?.title}
                    
                </Typography>
                <Grid2 className="flex gap-5 items-center" color="warning" sx={{ mb: 1 }}>
                    Status:
                    <Stack direction="row" spacing={1}>
                        <Chip label={request.status} color="success" variant="filled" />
                    </Stack>
                </Grid2>

                <Divider sx={{ my: 1, boxShadow:3}} />

                <Typography variant="body2" >
                    <CalendarMonth color="secondary"></CalendarMonth>
                    <strong>Move-in Date:</strong> {request?.moveInDate!.toString()}
                </Typography>

                <Typography className="grid" variant="body2" sx={{ mt: 3, color:'orangered' }}>
                    <strong>Message:   </strong>
                    <strong className="text-blue-700 border-2 py-4 px-4 shadow-lg">
                    <Message/> {request.message}
                        
                    </strong>
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                {
                     request.status=='pending' && <Button disabled={request.status!=='pending'} size="small" color="primary" variant="contained" onClick={()=>handleApprove(request._id as string)}>
                     <ApprovalRounded></ApprovalRounded>  {request.status!=='pending'?'Approved':'Approve'}
                   </Button>
                }

                
              {
                request.status=='pending' &&  <Button  size="small" onClick={()=>handleReject(request?._id as string)} color="error" variant="outlined">
                <MinusCircle></MinusCircle> Reject
             </Button>
              }  

              {
                request.status=='completed' &&  <Button  size="small" color="primary" variant="contained" onClick={()=>handleApprove(request._id as string)}>
                <ApprovalRounded></ApprovalRounded>  Download Receipt
              </Button>
              }
            </CardActions>
        </Card>
    );
};

export default LandlordRequestCard;
