"use client"
import { Card, CardContent, Typography, CardActions, Button, Divider, Box, Chip, Stack, Grid2 } from "@mui/material";
import { IRequest } from "@/types/request";
import { ApprovalRounded, CalendarMonth, CurrencyExchange, Message, Receipt } from "@mui/icons-material";
import { useCancelRequestMutation } from "@/lib/api/requestApi";
import { toast } from "sonner";
import { DollarSign, MinusCircle } from "lucide-react";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

interface RequestCardProps {
    request: IRequest;
    handleCheckout:(requestId:string)=>void
}

const LandlordApprovedRequestCard: React.FC<RequestCardProps> =({ request, handleCheckout, isLoading, refetch }) => {
    const data = useContext(DataContext)
    const listings = data?.data
    const linkedListing = listings?.find(item=>item._id==request.listingId)

    return (
        <Card sx={{ maxWidth: 400, borderRadius: 1, border:2, boxShadow: 5, p: 2, bgcolor: "whitesmoke" }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    Rental Request for {linkedListing?.title}
                    
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
                    <strong>Move-in Date:</strong> {new Date(request.moveInDate).toDateString()}
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
                    request.status=='approved' && <Button href="/checkout" className="flex gap-2" size="large" color="error" variant="contained" onClick={()=>handleCheckout(request._id as string)}>
                    <CurrencyExchange/> Checkout Now 
                  </Button>
                   }
                   {
                    request.status=='completed' &&  <Button href="/checkout" className="flex gap-2" size="large" color="error" variant="contained" >
                    <Receipt></Receipt>  View Payment Receipt
                  </Button>
                   }
 
            </CardActions>
        </Card>
    );
};

export default LandlordApprovedRequestCard;
