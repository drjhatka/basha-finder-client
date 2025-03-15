"use client"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {IListing} from "@/types/listing";
import {Button, CardMedia, Divider, Grid2, Tooltip} from "@mui/material";
import {Calendar, Eye, HeartIcon} from "lucide-react";
import {AutoDelete, EditNote, PendingActions, RequestPage} from "@mui/icons-material";
import { Avatar } from '@material-ui/core';


const LandlordListingCard = ({listing}:{listing:IListing}) => {

    return (
        <Grid2 mx={'auto'} >
        <Card  sx={{  boxShadow:'10px', border:2, borderColor:'#AA45AD' }}>
            <CardMedia
                component="img"
                sx={{height:150,  objectFit:'cover'}}
                image={listing?.images[0]}
                alt="Rental Image"
            />
            <CardHeader
                sx={{ "& .MuiCardHeader-title": { fontSize: "1rem", fontWeight: "semibold" } }}
                title={listing.title}
                subheader={'Posted On: '+ (new Date(listing.createdAt).toLocaleString()) }
            />

            <Divider></Divider>
            <CardContent>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {listing?.description.slice(0,50)}
                </Typography>
            </CardContent>
            <CardActions >
                <Button variant={'outlined'} size={'small'} color={'warning'}  >
                        <PendingActions></PendingActions>Update
                </Button>
                {/* <Button variant={'outlined'} size={'small'} color={'warning'}  >
                        <EditNote></EditNote>Edit Status
                </Button> */}
                <Tooltip disableFocusListener title="Delete">
            
                <Button variant={'outlined'} size={'small'} color={'error'}  >
                    <AutoDelete></AutoDelete> Delete
                </Button>
          </Tooltip>
                <Button href={`/rentals/${listing._id}`} variant={'outlined'} size={'small'} color={'info'}  >
                        <Eye></Eye> view
                </Button>
            </CardActions>
        </Card>
        </Grid2>
    )
};

export default LandlordListingCard;