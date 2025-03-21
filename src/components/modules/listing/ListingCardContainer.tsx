"use client"
import {IListing} from "@/types/listing";
import ListingCard from "@/components/modules/listing/ListingCard";
import BackdropElement from "@/components/ui/backdrop";
import { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";

const ListingCardContainer =({listings, isLoading}:{listings:IListing[], isLoading:boolean}) => {
    const [open, setOpen] = useState(false)
    return (<>
            <Typography mx={'auto'} bgcolor={'#ffffff'} width={'100%'} py={2} textAlign={'center'} variant="h4" >Explore all our Rental Listings</Typography>
    <div className={'grid bg-slate-300 md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
        
        {
            isLoading? <BackdropElement key={'loadingBackdrop'} open={!open} handleClose={()=>setOpen(false)} ><CircularProgress></CircularProgress></BackdropElement>: listings?.map((listing)=>{
                return <ListingCard key={listing._id} listing={listing}></ListingCard>
            })
        }
    </div>
    </>
    );
};

export default ListingCardContainer;