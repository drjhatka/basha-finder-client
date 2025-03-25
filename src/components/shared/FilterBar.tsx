"use client";
import { getListings } from "@/app/actions/ListingActions";
import { Typography } from "@material-ui/core";
import { FilterAlt } from "@mui/icons-material";
import { Box, Button, Grid, InputLabel, Slider, MenuItem, Select, Container } from "@mui/material";
import ListingCard from "../modules/listing/ListingCard";
import { useEffect, useState } from "react";
import { IListing } from "@/types/listing";
import { Formik } from "formik";

const FilterBar = () => {
    const priceRange = [
        { value: 1000, label: "$1K" },
        { value: 2000, label: "$2K" },
        { value: 3000, label: "$3K" },
        { value: 4000, label: "$4K" },
    ];
    
    const apartmentTypes = ["Apartment", "Condo", "House"];

    const [listings, setListings] = useState<IListing[]>([]);
    const [filteredListings, setFilteredListings] = useState<IListing[]>([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await getListings();
                setListings(data.data);
                setFilteredListings(data.data);

            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };
        fetchListings();
    }, []);

    // 🔥 Function to apply filters
    const handleFilterSubmit = (values: { location: string; price: number; type: string }) => {
        let filtered = listings;

        if (values.price) {
            filtered = filtered.filter((listing) => listing.rent <= values.price);
        }

        if (values.type) {
            filtered = filtered.filter((listing) => listing.type === values.type);
        }

        setFilteredListings(filtered);
    };

    return (
        <Grid container spacing={2}>
            <Grid item  xs={12} py={2} mb={2} lg={12} bgcolor={"white"} boxShadow={2} px={4}>
                <Typography variant="h6" className="shadow-lg  bg-orange-600 text-white mb-3 w-full py-5 text-center">
                    Check out our Latest Rental Listings
                </Typography>
                
                {/* Filter Section */}
                <Formik
                    initialValues={{ location: "", price: 100, type: "" }}
                    onSubmit={handleFilterSubmit}
                >
                    {({ values, setFieldValue, handleSubmit }) => (
                        <form className="w-full z-1 mt-4 " onSubmit={handleSubmit}>
                            <Grid container spacing={2} alignItems="center">
                                {/* Price Range */}
                                <Grid item display={'flex'} alignItems={'center'}  gap={4} xs={10} sm={10} md={4} lg={4} mx={'auto'} >
                                    <InputLabel color="warning">Rent</InputLabel>
                                    <Slider
                                        sx={{width:'70%'}}
                                        value={values.price}
                                        step={1000}
                                        marks={priceRange}
                                        min={1000}
                                        max={4000}
                                        valueLabelDisplay="off"
                                        onChange={(_, value) => setFieldValue("price", value)}
                                    />
                                </Grid>

                                {/* Apartment Type */}
                                <Grid item mx={'auto'} xs={10}  md={4} sm={10} lg={4}>
                                    <Box display={'flex'} gap={4} alignItems={'center'} >
                                    <Typography color="secondary" variant="body2"> Types</Typography>
                                    <Select 
                                        sx={{width:'100%'}}
                                        value={values.type}
                                        fullWidth
                                        displayEmpty
                                        onChange={(e) => setFieldValue("type", e.target.value)}
                                    >
                                        <MenuItem value="">All Types</MenuItem>
                                        {apartmentTypes.map((type) => (
                                            <MenuItem key={type} value={type.slice(0,1).toLowerCase()+type.slice(1)}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </Box>
                                </Grid>

                                {/* Apply Button */}
                                <Grid item pt={4} display={'flex'} xs={12} sm={12} md={3} lg={3} justifyContent={'center'}  alignItems={'center'}>
                                    <Button type="submit" variant="contained" color="primary">
                                        <FilterAlt /> Apply Filters
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>

            {/* Listings Grid */}
            <Container>
            <Grid container spacing={2} >
                {filteredListings.length > 0 ? (
                    filteredListings.slice(0, 6).map((item: IListing) => (
                        <Grid mt={1} item key={item._id} lg={4} md={6} sm={12} xs={12}>
                            <ListingCard listing={item} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="error" className="text-center w-full my-4">
                        No listings match your filters.
                    </Typography>
                )}
            </Grid>
            </Container>
            {/* Button to View All Listings */}
            <Grid item mx={"auto"} marginY={5}>
                <Button href="/rentals" variant="contained" color="secondary">
                    See All Listings
                </Button>
            </Grid>
        </Grid>


    );
};

export default FilterBar;
