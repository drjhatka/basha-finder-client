"use client"
import { Card, CardContent, Typography, CardActions, Button, Divider, Box, Chip, Stack, Grid2 } from "@mui/material";
import { TenantRequestCardProps } from "@/types/request";
import { CalendarMonth, Cancel, CreditCard, Message, Paid } from "@mui/icons-material";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

const TenantRequestCard: React.FC<TenantRequestCardProps> = ({ request, handleCancelRequest }) => {
    //console.log('req', request)
    const contextData = useContext(DataContext)
    const listing = contextData?.listingData?.find(item => item._id == request.listingId)
    //console.log('l', listingID)
    console.log('listing id', request.listingId)
    return (
        <>
        <Card sx={{ border: 1, py: 4, px: 4, boxShadow: '1px 4px 3px green' }}>
            <CardContent  >
                <Typography variant="h6" fontWeight="bold">
                    Rental Request for
                    {/*@ts-ignore */}
                    {request.listingId.title}
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

                {
                    request.status !== "completed" && <Typography className="grid" variant="body2" sx={{ mt: 3, color: 'orangered' }}>
                        <strong>Message:   </strong>
                        <strong className="text-blue-700 border-2 py-4 px-4 shadow-lg">
                            <Message /> {request.message}

                        </strong>
                    </Typography>
                }

                {
                    request.status == 'completed' && <Typography className="grid" variant="body2" sx={{ mt: 3, color: 'orangered' }}>
                        <strong>Total Payment   </strong>
                        <strong className="text-blue-700 border-2 py-4 px-4 shadow-lg">
                            <Paid />

                            {/* @ts-expect-error rent is a populated field */}
                            {request.listingId.rent}

                        </strong>
                    </Typography>
                }
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                {
                    request.status == 'pending' && <Grid2 container spacing={2}>

                        <Button href={"/tenant-dashboard/updateRequest/"+request._id} size="small" color="primary" variant="contained">
                            Update
                        </Button>
                        <Button startIcon={<Cancel />} size="small" onClick={() => handleCancelRequest(request?._id as string)} color="error" variant="outlined">
                            Cancel Request
                        </Button>
                    </Grid2>
                }
                {
                    request.status == 'approved' && <Grid2 container spacing={2}>
                        <Button startIcon={<CreditCard />} href={"/checkout/" + request._id} size="small" color="info" variant="contained">
                            Proceeed To payment
                        </Button>
                    </Grid2>
                }
                {
                    request.status == 'completed' && <Grid2 container spacing={2}>
                        <Button startIcon={<CreditCard />} size="small" color="warning" variant="contained">
                            View Landlord Contact Details
                        </Button>
                    </Grid2>
                }

            </CardActions>
        </Card>
        </>
    );
};

export default TenantRequestCard;
