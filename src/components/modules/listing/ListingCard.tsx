"use client"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {IListing} from "@/types/listing";
import {Button, CardMedia, Divider} from "@mui/material";
import {Eye, HeartIcon} from "lucide-react";
import {RequestPage} from "@mui/icons-material";


const ListingCard = ({listing}:{listing:IListing}) => {

    return (
        <Card sx={{ paddingX:3,paddingY:2, boxShadow:4, border:2, borderColor:'#123443' }}>
            <CardMedia
                component="img"
                sx={{height:150, borderRadius:1, objectFit:'cover'}}
                image={listing?.images[0]}
                alt="Rental Image"
            />
            <CardHeader
                /*avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="listing">
                        L
                    </Avatar>}*/
                        titleTypographyProps={{
                            fontSize: 20,
                        }}
                title={listing.title}
                subheader={'Posted On: '+ (new Date(listing.createdAt).toLocaleString()) }
            />

            <Divider></Divider>
            <CardContent>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {listing?.description}
                </Typography>
            </CardContent>
            <CardActions >
                <Button variant={'outlined'} size={'small'} color={'warning'}  >
                        <HeartIcon ></HeartIcon> Fav
                </Button>
                <Button variant={'outlined'} size={'small'} color={'success'}  >
                    <RequestPage></RequestPage> Book
                </Button>
                <Button variant={'outlined'} size={'small'} color={'info'}  >
                        <Eye></Eye> view
                </Button>
            </CardActions>
        </Card>
    )
};

export default ListingCard;