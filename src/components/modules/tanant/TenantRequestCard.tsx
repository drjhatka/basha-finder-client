"use client"
import { Card, CardContent, Typography, CardActions, Button, Divider, Box, Chip, Stack, Grid2 } from "@mui/material";
import { TenantRequestCardProps } from "@/types/request";
import { CalendarMonth, Cancel, CreditCard, Message } from "@mui/icons-material";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

const TenantRequestCard: React.FC<TenantRequestCardProps> = ({ request, handleCancelRequest }) => {
    console.log('req', request)
    //const {listingData} = useContext(DataContext)
    //const listing = listingData?.find(item=>item._id==listingID)
    //console.log('l', listingID)
    return (
        <Card sx={{ border: 1, py: 4, px: 4, boxShadow: '1px 4px 3px green' }}>
            <CardContent  >
                <Typography variant="h6" fontWeight="bold">
                    Rental Request for
                </Typography>
                <Grid2 className="flex gap-5 items-center" color="warning" sx={{ mb: 1 }}>
                    Status:
                    <Stack direction="row" spacing={1}>
                        <Chip label={request.status} color="success" variant="filled" />
                    </Stack>
                </Grid2>

                <Divider sx={{ my: 1, boxShadow: 3 }} />

                <Typography variant="body2" >
                    <CalendarMonth color="secondary"></CalendarMonth>
                    <strong>Move-in Date:</strong> {new Date(request.moveInDate as Date).toDateString()}
                </Typography>

                <Typography className="grid" variant="body2" sx={{ mt: 3, color: 'orangered' }}>
                    <strong>Message:   </strong>
                    <strong className="text-blue-700 border-2 py-4 px-4 shadow-lg">
                        <Message /> {request.message}

                    </strong>
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                {
                    request.status !== 'approved' && <Grid2 container spacing={2}>
                        
                        <Button size="small" color="primary" variant="contained">
                            Update
                        </Button>
                        <Button startIcon={<Cancel />} size="small" onClick={() => handleCancelRequest(request?._id as string)} color="error" variant="outlined">
                            Cancel Request
                        </Button>
                    </Grid2>
                }
                {
                    request.status == 'approved' && <Grid2 container spacing={2}>  
                        <Button startIcon={<CreditCard/>} href={"/checkout/"+request._id} size="small" color="info" variant="contained">
                            Proceeed To payment
                        </Button>
                    </Grid2>
                }

            </CardActions>
        </Card>
    );
};

export default TenantRequestCard;
