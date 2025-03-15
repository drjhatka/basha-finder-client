"use client"
import ListingCard from '@/components/modules/listing/ListingCard';
import ListingCardContainer from '@/components/modules/listing/ListingCardContainer';
import ListingTabComponent from '@/components/modules/listing/ListingTabComponent';
import { DataContext } from '@/context/DataContext';
import { IListing } from '@/types/listing';
import { Grid2 } from '@mui/material';
import React, { useContext } from 'react';

const AllRentalsPage = () => {
    const data = useContext(DataContext)
    const listings = data?.data
    return (
        <Grid2   pt={2} px={2}  gap={2} >
            <ListingCardContainer listings={listings!}></ListingCardContainer>
        </Grid2>
    );
};

export default AllRentalsPage;