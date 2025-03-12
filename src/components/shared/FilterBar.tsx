"use client"
import { getListings } from "@/app/actions/ListingActions";
import { Typography } from "@material-ui/core";
import { FilterAlt } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";
import ListingCard from "../modules/listing/ListingCard";
import { useEffect, useState } from "react";

const FilterBar = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await getListings(); // Fetch listings
                setListings(data); // Update state
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        fetchListings();
    }, []);
    console.log('l', listings)

    return (
        <Grid2  component={'div'} container className="py-4 grid  mt-4 ">
            <Typography  variant="h5" className=" border-b-2 w-full py-5 text-center">
                Check out our Latest Rental Listings
            </Typography>
            <Grid2 size={{lg:12}} padding={4} borderBottom={2} marginBottom={3} >
                <FilterAlt color="info" className="w-full"></FilterAlt> Apply Filters
            </Grid2>
            <Grid2 container spacing={2} >
                {
                    listings?.data?.slice(0,6).map(item=><ListingCard key={item._id} listing={item}></ListingCard>)
                }
                
            </Grid2>
            <Grid2 container mx={'auto'} marginY={5}>
                <Button variant="contained" color="secondary">See All Listings</Button>
            </Grid2>
        </Grid2>
    );
};

export default FilterBar;