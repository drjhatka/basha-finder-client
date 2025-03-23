"use client";
import { getListings } from "@/app/actions/ListingActions";
import { Typography } from "@material-ui/core";
import { FilterAlt } from "@mui/icons-material";
import { Box, Button, Grid, InputLabel, Slider, MenuItem, Select } from "@mui/material";
import ListingCard from "../modules/listing/ListingCard";
import { useEffect, useState } from "react";
import { IListing } from "@/types/listing";
import { Formik } from "formik";

const FilterBar = () => {
    const priceRange = [
        { value: 1000, label: "$1000" },
        { value: 2000, label: "$2000" },
        { value: 3000, label: "$3000" },
        { value: 4000, label: "$4000" },
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
            <Grid item xs={12} borderBottom={2} py={2} mb={2} bgcolor={"white"} boxShadow={2} px={4}>
                <Typography variant="h5" className="border-b-2 w-full py-5 text-center">
                    Check out our Latest Rental Listings
                </Typography>
                
                {/* Filter Section */}
                <Formik
                    initialValues={{ location: "", price: 100, type: "" }}
                    onSubmit={handleFilterSubmit}
                >
                    {({ values, setFieldValue, handleSubmit }) => (
                        <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                            <Grid container spacing={4} alignItems="center">
                                {/* Price Range */}
                                <Grid item xs={12} sm={12} lg={3} mx={'auto'} >
                                    <InputLabel>Price Range</InputLabel>
                                    <Slider
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
                                <Grid item xs={12} sm={4}>
                                    <InputLabel sx={{ mb: 2 }}>Apartment Types</InputLabel>
                                    <Select
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
                                </Grid>

                                {/* Apply Button */}
                                <Grid item xs={12} sm={4} display="flex" alignItems="center">
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
            <Grid container spacing={2}>
                {filteredListings.length > 0 ? (
                    filteredListings.slice(0, 6).map((item: IListing) => (
                        <Grid item key={item._id} lg={4} md={6} sm={12} xs={12}>
                            <ListingCard listing={item} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="error" className="text-center w-full my-4">
                        No listings match your filters.
                    </Typography>
                )}
            </Grid>

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
