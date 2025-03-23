"use client";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { IListing } from "@/types/listing";
import { Button, CardMedia, Chip, Divider, Grid } from "@mui/material";
import { Eye, HeartIcon } from "lucide-react";
import { RequestPage } from "@mui/icons-material";

const ListingCard = ({ listing }: { listing: IListing }) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Card
        sx={{
          mb:2,
          width: "100%",
          height: 450, // Set a fixed height
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
        }}
      >
        {/* Image */}
        <CardMedia
          component="img"
          sx={{
            height: 150, // Set fixed height
            objectFit: "cover",
          }}
          image={listing?.images[0]}
          alt="Rental Image"
        />

        {/* Title & Date */}
        <CardHeader
          sx={{
            "& .MuiCardHeader-title": { fontSize: "1rem", fontWeight: "bold" },
            flexGrow: 0,
          }}
          title={listing.title}
          subheader={"Posted On: " + new Date(listing.createdAt).toLocaleString()}
        />
        <Grid container>
        <Grid item  width={"100%"} display="flex" gap={2} p={2} flexWrap="wrap">
            <Chip variant="filled" color="info" label={"Location :" + listing?.location}>
            </Chip>
            <Chip variant="filled" color="success" label={"Rent :" + listing?.rent}>
            </Chip>
          </Grid>
        </Grid>
        <Divider />

        {/* Description */}
        <CardContent sx={{ flexGrow: 1 }}>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {listing?.description.slice(0, 50)}...

            <Button variant="text" size="small">
              See More
            </Button>
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ justifyContent: "space-between", pb: 0 }}>
          <Button variant="contained" size="small" color="warning">
            <HeartIcon size={16} /> Fav
          </Button>
          <Button
            href={`/tenant-dashboard/createRequest/${listing._id}`}
            variant="contained"
            size="small"
            color="success"
          >
            <RequestPage /> Book
          </Button>
          <Button href={`/rentals/${listing._id}`} variant="contained" size="small" color="info">
            <Eye size={16} /> View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ListingCard;


// "use client"
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Typography from '@mui/material/Typography';
// import {IListing} from "@/types/listing";
// import {Button, CardMedia, Divider, Grid2} from "@mui/material";
// import { Eye, HeartIcon} from "lucide-react";
// import {RequestPage} from "@mui/icons-material";


// const ListingCard = ({listing}:{listing:IListing}) => {

//     return (
//         <Grid2 mx={'auto'} >
//         <Card  sx={{  boxShadow:'10px' }}>
//             <CardMedia
//                 component="img"
//                 sx={{height:150,  objectFit:'cover'}}
//                 image={listing?.images[0]}
//                 alt="Rental Image"
//             />
//             <CardHeader
//                 sx={{ "& .MuiCardHeader-title": { fontSize: "1rem", fontWeight: "semibold" } }}
//                 title={listing.title}
//                 subheader={'Posted On: '+ (new Date(listing.createdAt).toLocaleString()) }
//             />

//             <Divider></Divider>
//             <CardContent>
//                 <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                     {listing?.description.slice(0,50)}...<Button variant='outlined'>See More</Button>
//                 </Typography>
//             </CardContent>
//             <CardActions >
//                 <Button variant={'outlined'} size={'small'} color={'warning'}  >
//                         <HeartIcon ></HeartIcon> Fav
//                 </Button>
//                 <Button href={`/tenant-dashboard/createRequest/${listing._id}`} variant={'outlined'} size={'small'} color={'success'}  >
//                     <RequestPage></RequestPage> Book
//                 </Button>
//                 <Button href={`/rentals/${listing._id}`} variant={'outlined'} size={'small'} color={'info'}  >
//                         <Eye></Eye> view
//                 </Button>
//             </CardActions>
//         </Card>
//         </Grid2>
//     )
// };

// export default ListingCard;