"use client"
import { Typography } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";
import { Formik } from "formik";
import { IListing } from "@/types/listing";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter} from "next/navigation";
import {toast} from "sonner";

export const HeroSection = ({ listings }:{listings:IListing[]|undefined|null}) => {
    const router=  useRouter()
    return (
        <Grid2 size={{ lg: 12 }} sx={{ background: "#3cb6d3" }}>
            <Grid2>
                <Typography variant="h4" className="py-4 text-white" align="center">Its Time to move!</Typography>
                <Typography variant="h4" className="py-4 text-white" align="center">Search & Find your next sweet home.!</Typography>
            </Grid2>

            <Formik
                initialValues={{ searchTerm: '' }}
                onSubmit={(values:  {searchTerm:string}) => {
                    //const listingId = values.searchTerm
                    const listingId:string|undefined = listings?.find((listing:IListing)=>listing.title==values.searchTerm)?._id
                   if(listingId) {router.push('/rentals/'+listingId)}
                   else{
                       toast.error('Listing Not Found, Try Again')
                   }
                }}
            >
                {formik => (
                    <form
                        className="w-full min-h-40 px-10"
                        style={{ backgroundImage: 'url("/hero-bg.svg")' }}
                        onSubmit={formik.handleSubmit}
                    >
                        {/* Search Bar & Button Container */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <ReactSearchAutocomplete<IListing>
                                items={listings as IListing[]}
                                onSelect={(item) => formik.setFieldValue("searchTerm", item.title)}
                                onSearch={(query) => formik.setFieldValue("searchTerm", query)}
                                placeholder={'Search Thousands of houses, apartments in major cities'}
                                fuseOptions={{ keys: ["title", "description","location" ] }}
                                resultStringKeyName="title"
                                className={'flex-1'}
                                formatResult={(item:IListing) => (
                                    <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ fontWeight: "bold" }}>{item.title}</span>
                                        <span style={{ fontSize: "12px", color: "gray" }}>{item.location}</span>
                                    </div>
                                )}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                style={{ paddingTop: 13, paddingBottom: 13 }}
                                size="large"
                            >
                                <Search /> Search listing
                            </Button>
                        </div>

                        {formik.touched.searchTerm && formik.errors.searchTerm ? (
                            <div>{formik.errors.searchTerm}</div>
                        ) : null}
                    </form>
                )}
            </Formik>
        </Grid2>
    );
};

export default HeroSection;
