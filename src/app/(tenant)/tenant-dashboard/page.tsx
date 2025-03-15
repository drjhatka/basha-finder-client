
"use client"
import {getListings} from "@/app/actions/ListingActions";
import ListingTabComponent from "@/components/modules/listing/ListingTabComponent";
import { DataContext } from "@/context/DataContext";
import { IListing } from "@/types/listing";
import { useContext } from "react";

const TenantDashboard =  () => {
        const data = useContext(DataContext)
             //find only with landlord id listings
            const listings= data?.data

    return (
        <div className={'mt-10'}>
            <ListingTabComponent key={'listingTab'} listings={listings as IListing[]} />
        </div>
    );
};

export default TenantDashboard;