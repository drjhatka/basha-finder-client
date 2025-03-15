
import { Card, CardContent, Typography, CardActions, Button, Divider, Box, Chip, Stack, Grid2 } from "@mui/material";
import { RequestModel } from "@/models/RequestModel"; // Adjust import as needed
import { IRequest } from "@/types/request";
import { CalendarMonth, Message } from "@mui/icons-material";
import { useCancelRequestMutation } from "@/lib/api/requestApi";
import { toast } from "sonner";

interface RequestCardProps {
    request: IRequest;
    handleCancelRequest:(requestId:string)=>void
}

const RequestCard: React.FC<RequestCardProps> =({ request, handleCancelRequest }) => {
    
    return (
        <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3, p: 2, bgcolor: "background.paper" }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    Rental Request
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

                <Button size="small" color="primary" variant="contained">
                    Update
                </Button>
                <Button size="small" onClick={()=>handleCancelRequest(request?._id as string)} color="error" variant="outlined">
                    Cancel Request
                </Button>
            </CardActions>
        </Card>
    );
};

export default RequestCard;
