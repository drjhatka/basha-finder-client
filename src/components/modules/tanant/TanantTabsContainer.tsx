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
import { useGetPaymentsByTenantIDQuery } from '@/lib/api/paymentApi';
import PaymentHistoryContainer from './PaymentHistoryContainer';
import { getAllPaymentsByTenantID } from '@/app/actions/PaymentActions';

const TenantTabsContainer = () => {
    const [value, setValue] = useState<string>('1');
    //Load All Listings and Requests from data context...
    const dataContext = useContext(DataContext);

    const listings = dataContext?.listingData || [];
    const isLoading = dataContext?.isLoading ?? true;
    //retrieve user..
    const user:IAuthState|null =  useSelector((state:RootState) => state.rootReducers.auth )as IAuthState |null  ; 
    
    
    //getApproved and Pending requests for this tenant...
    const {data:pendingRequests, isLoading:pendingLoading, refetch:pendingRefetch} = useGetRequestsByTenantIDQuery({id:user?.userId, status:"pending" })
    const {data:approvedRequests, isLoading:approvedLoading, refetch:approvedRefetch} = useGetRequestsByTenantIDQuery({id:user?.userId, status:"approved" })
    //const {data:completedRequests, isLoading:completedLoading, refetch:completedRefetch} = useGetRequestsByTenantIDQuery({id:user?.userId, status:"completed" })
    //define handle change event
    const handleChange = (event:SyntheticEvent<Element, Event>, newValue:string) => {
        setValue(newValue); // Update the active tab
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

                <TabPanel value="2">
                    <TenantRequestCardContainer requests={pendingRequests?.data} isLoading={pendingLoading} refetch={pendingRefetch}  />
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