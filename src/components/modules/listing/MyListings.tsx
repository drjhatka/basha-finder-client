"use client"
import { IListing } from '@/types/listing';
import React, { useContext } from 'react';
import ListingCard from './ListingCard';
import { DataContext } from '@/context/DataContext';
import { getCurrentUser } from '@/services/AuthService';
import { IUser } from '@/types';
import { Alert, AlertTitle, Button, Fade, Grid2 } from '@mui/material';
import LandlordListingCard from './LandlordListingCard';

const MyListings = ({user}:{user:IUser|null}) => {
     const data = useContext(DataContext)
     const listings = data?.data
     const filteredListings = listings?.filter(item=>item.landlordId==user?.userId)
     
    return (
        <Grid2>
            <Grid2 container spacing={2}>
            {
                filteredListings && filteredListings?.map((listing:IListing)=><Grid2 size={{xs:12, sm:12, md:6,lg:4}}   key={listing._id}>
                    <Fade in={true} appear={true}>
                        <div><LandlordListingCard listing={listing} ></LandlordListingCard></div></Fade> </Grid2>)
            }
            </Grid2>
            
                <Grid2 component={'div'}  spacing={2} padding={4}><Alert
                    
                    sx={{paddingBottom:"10px"}}
                    severity='warning'
                >
                        <AlertTitle>You have not created any Listings yet!</AlertTitle>
                        <Button href='/landlord-dashboard' variant={'contained'}>Create A Listing</Button>
                    </Alert></Grid2>
                 
           
                
        </Grid2>
    );
};

export default MyListings;