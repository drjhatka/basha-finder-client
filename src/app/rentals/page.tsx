"use client"
import ListingCardContainer from '@/components/modules/listing/ListingCardContainer';
import { DataContext } from '@/context/DataContext';
import { Grid2 } from '@mui/material';
import React, { useContext } from 'react';

const AllRentalsPage = () => {
    const data = useContext(DataContext)
    const listings = data?.listingData
    return (
        <Grid2 container   pt={2} px={2}  gap={2} >
            <ListingCardContainer listings={listings!} isLoading={data?.isLoading as boolean} ></ListingCardContainer>
        </Grid2>
    );
};

export default AllRentalsPage;