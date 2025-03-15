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
    //console.log('l', listings.data)

    return (
        <Grid2 container spacing={2} >
            <Typography  variant="h5" className=" border-b-2 w-full py-5 text-center">
                Check out our Latest Rental Listings
            </Typography>
            <Grid2 size={{lg:12}} borderBottom={2} py={2} mb={2} borderColor={'#AA45AD'} boxShadow={2} px={4}  >

                <FilterAlt color="info" className="w-full"></FilterAlt> Apply Filters
            </Grid2>
            <Grid2 container >
                
                 {
                     listings?.data?.slice(0,6).map(item=><Grid2 key={item._id}  size={{lg:4, md:6, sm:12, xs:12}}><ListingCard   listing={item}></ListingCard></Grid2>)
                    }
                
                
            </Grid2>
            <Grid2 mx={'auto'} marginY={5}>
                <Button href="/rentals" variant="contained" color="secondary">See All Listings</Button>
            </Grid2>
        </Grid2>
    );
};

export default FilterBar;