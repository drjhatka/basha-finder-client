"use client"
import { DataContext } from '@/context/DataContext';
import { IAuthState } from '@/lib/actions/authSlice';
import { RootState } from '@/lib/store';
import { createSlideImageFromArray } from '@/lib/utils';
import { IListing } from '@/types/listing';
import { format } from 'date-fns'
import { Typography } from '@material-ui/core';
import { ApartmentTwoTone, DiningSharp, Home, KeyboardReturn, Map, Mouse, RequestQuote } from '@mui/icons-material';
import { Box, Button, Chip, Grid2, Paper, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from 'react-redux';
import Breadcrumb from '@/components/shared/Breadcrumb';

const ViewRentalPage = () => {
    const contextData = useContext(DataContext)
    const user: IAuthState | null = useSelector((state: RootState) => state.rootReducers.auth as IAuthState | null) ;
    const rentalId = useParams().rentalId

    const data: IListing[] | undefined = contextData?.listingData?.filter((item: IListing) => item._id == rentalId)

    return (
        <>
        <Stack    alignItems={'center'}  textAlign={'center'} display={'flex'} justifyContent={'center'}>
            {
                user && user?.role=='tenant'  && <Breadcrumb  links={[{href:'/tenant-dashboard?tab=1', icon:<KeyboardReturn/>,title:'Back To Dashboard'}]}></Breadcrumb>
            }

        </Stack>
        <div className="bg-white ">
            {data && contextData?.listingData && <Grid2 container key={'view-listing'}>  <Grid2 size={{ md: 12, lg: 6 }} mt={5} >
                <ImageGallery showBullets additionalClass='w-full' items={data[0]?.images && createSlideImageFromArray(data[0]?.images)}></ImageGallery>

            </Grid2>
                <Grid2 size={{ lg: 6, md: 12, sm: 12, xs: 12 }} marginTop={{ sm: 2, md: 2, lg: 3 }} px={4} py={2} >
                    <Grid2 >
                        <Typography className='border-b-2 bg-slate-100 shadow-2xl py-2 text-center text-orange-800' variant='h5' >{data[0]?.title}</Typography>

                    </Grid2>
                    <Grid2 container>
                        <Grid2 container spacing={5} >
                            <Grid2 container component={'div'} spacing={3} mt={1}>
                                <Stack direction={'row'} spacing={2} mt={5} mx={'auto'}>
                                    <Chip icon={<RequestQuote />} color='primary' label={"Rent: " + data[0]?.rent}>
                                    </Chip>
                                    <Chip icon={<ApartmentTwoTone />} color='primary' label={"Type: " + data[0]?.type.slice(0, 1).toUpperCase() + data[0]?.type.slice(1)}>
                                    </Chip>
                                    <Chip icon={<Map />} color='primary' label={"Location: " + data[0]?.location}>
                                    </Chip>
                                </Stack>
                            </Grid2>

                            <Grid2 container spacing={1}>
                                <Typography key={'description-header'} variant='inherit' style={{ borderBottom: '2px solid #1976d2', width: '100%' }}  >Rental Description</Typography>

                                <Typography key={'description'} variant='body1' style={{ color: 'orangered' }} >
                                    {data[0]?.description}
                                </Typography>
                            </Grid2>
                            <Box sx={{ width: '100%' }}>
                                <Typography variant='h6'><DiningSharp /> Amenites Included:</Typography>
                            </Box>
                            <Grid2 container>
                                {data[0]?.amenities?.map((item, index) => <Grid2 direction={'row'} key={index} ><Paper><Chip label={item} variant='filled' color='info'></Chip></Paper></Grid2>)}
                            </Grid2>
                            <Grid2 container direction={'row'} spacing={3} size={{ xs: 12 }} sx={{ textAlign: 'center' }}>

                                <Paper elevation={5} sx={{px:3,  py:3}} >Available From {format(new Date(data[0].availableFrom as Date), 'dd-MM-yyyy')}</Paper>
                                <Paper elevation={5} sx={{px:3, py:3}}>Available Until {format(new Date(data[0].availableUntil as Date), 'dd-MM-yyyy')}</Paper>
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
        </>
    );
};

export default ViewRentalPage;