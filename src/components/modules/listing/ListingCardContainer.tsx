"use client"
import {IListing} from "@/types/listing";
import ListingCard from "@/components/modules/listing/ListingCard";
import BackdropElement from "@/components/ui/backdrop";
import { CircularProgress } from "@material-ui/core";
import { useState } from "react";

const ListingCardContainer =({listings, isLoading}:{listings:IListing[], isLoading:boolean}) => {
    const [open, setOpen] = useState(false)
    return (
    <div className={'grid md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
        {
            isLoading? <BackdropElement open={!open} handleClose={()=>setOpen(false)} ><CircularProgress></CircularProgress></BackdropElement>: listings?.map((listing)=>{
                return <ListingCard key={listing._id} listing={listing}></ListingCard>
            })
        }
    </div>
    );
};

export default ListingCardContainer;