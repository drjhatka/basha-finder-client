"use client"
import { DataContext } from '@/context/DataContext';
import { IAuthState } from '@/lib/actions/authSlice';
import { RootState } from '@/lib/store';
import { createSlideImageFromArray } from '@/lib/utils';
import { IListing } from '@/types/listing';
import { Typography } from '@material-ui/core';
import { GiteTwoTone, Mouse, RequestQuote } from '@mui/icons-material';
import { Badge, Button, Grid2 } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from 'react-redux';

const ViewRentalPage = () => {
    const contextData = useContext(DataContext)
    const user:IAuthState|null = useSelector((state:RootState) => state.rootReducers.auth);
    const rentalId = useParams().rentalId

    const data:IListing[]|undefined = contextData?.data?.filter(item=>item._id==rentalId)
    
    return (
        <>
        { data && contextData?.data &&  <><Grid2 size={{md:12,lg:6}} >
            <ImageGallery showBullets  additionalClass='w-full' items={data[0]?.images ? createSlideImageFromArray(data[0]?.images):images}></ImageGallery>
                
            </Grid2>
             <Grid2 size={{lg:6, md:12, sm:12, xs:12}} marginTop={{sm:2, md:2, lg:0}}  px={4} py={4}>
                <Grid2>
                 <Typography className='border-b-2 shadow-2xl py-2 text-center' variant='h5' >{data[0]?.title}</Typography>
             
                </Grid2>
                <Grid2 container>
                    <Grid2 columnSpacing={20} py={3} container >
                        <Typography style={{color:'red'}} >
                            Rent: 
                        <RequestQuote></RequestQuote> {data[0]?.rent}
                        </Typography>
                        <Typography style={{color:'red', marginBottom:'20px'}} >
                             
                        <GiteTwoTone color='info' className='text-2xl' /> {data[0]?.type}
                        </Typography>
                        <Typography variant='body2' style={{color:'red', marginBottom:'20px'}} >
                            {data[0]?.description}
                        </Typography>
                        <Typography variant='body2' style={{color:'red', marginBottom:'20px'}} >
                            Amenites Included: 
                            {data[0]?.amenities?.map(item=><li><Badge variant='standard' color='info'>{item}</Badge></li>)}
                        </Typography>


                        <Grid2 size={{xs:12}} sx={{textAlign:'center'}}>

                        <Button href={!user ?'/login':'/tenant-dashboard/createRequest/'+data[0]._id} disabled={user?.role=="landlord" || user?.role=='admin'} variant='contained' size='large' sx={{gap:2, flexGrow:1}}  ><Mouse></Mouse> Book This Listing</Button>
                        </Grid2>
                        
                    </Grid2>
                </Grid2>

             </Grid2></>
        }
         </>   
    );
};

export default ViewRentalPage;