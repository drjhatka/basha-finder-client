"use client"
import { DataContext } from '@/context/DataContext';
import { IAuthState } from '@/lib/actions/authSlice';
import { RootState } from '@/lib/store';
import { createSlideImageFromArray } from '@/lib/utils';
import { IListing } from '@/types/listing';
import { Typography } from '@material-ui/core';
import { ApartmentTwoTone, DiningSharp, Directions,  Map, Mouse, RequestQuote } from '@mui/icons-material';
import {  Button, Chip,  Grid2 } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from 'react-redux';

const ViewRentalPage = () => {
    const contextData = useContext(DataContext)
    const user: IAuthState | null = useSelector((state: RootState) => state.rootReducers.auth) as IAuthState | null;
    const rentalId = useParams().rentalId

    const data: IListing[] | undefined = contextData?.listingData?.filter((item: IListing) => item._id == rentalId)

    return (
        <div className="bg-white ">
            {data && contextData?.listingData && <Grid2 container key={'view-listing'}>  <Grid2 size={{ md: 12, lg: 6 }} mt={5} >
                <ImageGallery showBullets additionalClass='w-full' items={data[0]?.images && createSlideImageFromArray(data[0]?.images)}></ImageGallery>

            </Grid2>
                <Grid2 size={{ lg: 6, md: 12, sm: 12, xs: 12 }} marginTop={{ sm: 2, md: 2, lg: 0 }} px={4} py={4} >
                    <Grid2 >
                        <Typography className='border-b-2 bg-red-50 shadow-2xl py-2 text-center text-orange-800' variant='h5' >{data[0]?.title}</Typography>

                    </Grid2>
                    <Grid2 container>
                        <Grid2 container spacing={5} >
                            <Grid2 container mx={'auto'} mt={2}>

                                <Chip icon={<RequestQuote />} color='primary' label={"Rent: " + data[0]?.rent}>
                                </Chip>
                                <Chip icon={<ApartmentTwoTone />} color='primary' label={"Type: " + data[0]?.type.slice(0, 1).toUpperCase() + data[0]?.type.slice(1)}>
                                </Chip>
                                <Chip icon={<Map />} color='primary' label={"Location: " + data[0]?.location}>
                                </Chip>
                            </Grid2>
                            <Grid2 container spacing={1}>
                                <Typography key={'description-header'} variant='inherit' style={{borderBottom:'2px solid #1976d2', width:'100%'}}  >Rental Description</Typography>
                                
                                <Typography key={'description'}  variant='body1' style={{ color: 'orangered'}} >
                                    {data[0]?.description}
                                </Typography>
                            </Grid2>
                            <Grid2 container >
                                <Typography variant='h6' style={{ marginBottom:10}}><DiningSharp/> Amenites Included:</Typography>
                            <Typography key={'amenities'} variant='body2' style={{ color: 'blueviolet', marginBottom: '20px' }} >
                                
                                {data[0]?.amenities?.map((item, index) => <Grid2 direction={'row'} key={index} container spacing={2} sx={{mb:2}}><Directions/><Chip label={item} variant='filled' color='info'></Chip></Grid2>)}
                            </Typography>
                            </Grid2>


                            <Grid2 size={{ xs: 12 }} sx={{ textAlign: 'center' }}>

                                <Button href={!user ? '/login' : '/tenant-dashboard/createRequest/' + data[0]._id} disabled={user?.role == "landlord" || user?.role == 'admin'} variant='contained' size='large' sx={{ gap: 2, flexGrow: 1 }}  ><Mouse></Mouse> Book This Listing</Button>
                            </Grid2>

                        </Grid2>
                    </Grid2>

                </Grid2>
            </Grid2>
            }
        </div>
    );
};

export default ViewRentalPage;