"use client"
import React, {SyntheticEvent, useContext, useState} from 'react';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box} from "@mui/system";
import {Tab} from "@mui/material";
import ListingCardContainer from "@/components/modules/listing/ListingCardContainer";
import {useGetRequestsByTenantIDQuery } from '@/lib/api/requestApi';
import { IAuthState } from '@/lib/actions/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import TenantRequestCardContainer from './TenantRequestCardContainer';
import { DataContext } from '@/context/DataContext';
import PaymentHistoryContainer from './PaymentHistoryContainer';
import StickyHeadTable from '@/components/shared/StickyHeadTable';
import { useRouter } from 'next/navigation';

const TenantTabsContainer = ({tab}:{tab:string}) => {
    const [value, setValue] = useState<string>(tab||"1");
    const router = useRouter()
   
    //Load All Listings and Requests from data context...
    const dataContext = useContext(DataContext);

    const listings = dataContext?.listingData || [];
    const isLoading = dataContext?.isLoading ?? true;
    //retrieve user..
    const user:IAuthState|null =  useSelector((state:RootState) => state.rootReducers.auth )as IAuthState |null  ; 
    
    
    //getApproved and Pending requests for this tenant...
    const {data:pendingRequests, isLoading:pendingLoading, refetch:pendingRefetch} = useGetRequestsByTenantIDQuery({id:user?.userId, status:"pending" })
    const {data:approvedRequests, isLoading:approvedLoading, refetch:approvedRefetch} = useGetRequestsByTenantIDQuery({id:user?.userId, status:"approved" })
    
    //define handle change event
    const handleChange = (event:SyntheticEvent<Element, Event>, newValue:string) => {
        setValue(newValue); // Update the active tab
        //append value to url as search query sample /tenant-dashboard?tab=2
        router.push(`/tenant-dashboard?tab=${newValue}`);
    };

    return (
            <TabContext  value={value} >
                <Box width={'100%'} display={'flex'} bgcolor={'white'} marginTop={4} justifyContent={'center'} >
                    <TabList onChange={handleChange} aria-label="Rentopia Tenant Tabs">
                        <Tab  label="Book Listings" value="1" />
                        <Tab label="Pending Requests" value="2" />
                        <Tab label="Approved Requests" value="3" />
                        <Tab label="My Payments" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ListingCardContainer listings ={listings} isLoading={isLoading} />
                </TabPanel>

                <TabPanel value="2" sx={{width:"100%"}}>
                    <StickyHeadTable requestData={pendingRequests?.data} refetch={pendingRefetch}></StickyHeadTable>
                    {/* <TenantRequestCardContainer requests={pendingRequests?.data} isLoading={pendingLoading} refetch={pendingRefetch}  /> */}
                </TabPanel>


                <TabPanel value="3">
                    <TenantRequestCardContainer requests={approvedRequests?.data} isLoading={approvedLoading} refetch={approvedRefetch} />
                </TabPanel>
                <TabPanel value="4">
                    <PaymentHistoryContainer userId={user?.userId as string}></PaymentHistoryContainer>
                    {/* <TenantRequestCardContainer requests={completedRequests?.data} isLoading={completedLoading} refetch={completedRefetch} /> */}
                </TabPanel>
            </TabContext>
    );
};

export default TenantTabsContainer;