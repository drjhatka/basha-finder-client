"use client"
import {IListing} from "@/types/listing";
import ListingCard from "@/components/modules/listing/ListingCard";
const ListingCardContainer =({listings}:{listings:IListing[]}) => {

    return (
    <div className={'grid md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
        {
            listings?.map((listing)=>{
                return <ListingCard key={listing._id} listing={listing}></ListingCard>
            })
        }
    </div>
    );
};

export default ListingCardContainer;