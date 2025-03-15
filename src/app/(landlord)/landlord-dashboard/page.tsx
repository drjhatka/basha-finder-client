"use client"
import CreateListingForm from '@/components/modules/listing/CreateListingForm';
import MyListings from '@/components/modules/listing/MyListings';
import { DataContext } from '@/context/DataContext';
import { UserContext } from '@/context/UserContext';
import { RootState } from '@/lib/store';
import { IUser } from '@/types';
import { IListing } from '@/types/listing';
import { AutoStories, CreditScore, DesignServices, PendingActions, PublishedWithChanges } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid2, Tab } from '@mui/material';
import React, { SyntheticEvent, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

const LandlordDashboard = () => {
        const data = useContext(DataContext)
         //find only with landlord id listings
         const listings:IListing[]|null = data?.data
         
         const user =  useSelector((state:RootState) => state.rootReducers.auth);
         const filteredListings = listings?.filter(item=>item.landlordId==user?.userId)
        const [value, setValue] = useState("1");
        const handleChange = (event:SyntheticEvent<Element, Event>, newValue:string) => {
            setValue(newValue); // Update the active tab
        };
    return (
            <TabContext   value={value} >
                <Box  sx={{ borderBottom: 1, display: 'flex', width:'100%', justifyContent: 'center' }}>
                    <TabList onChange={handleChange} aria-label="Rentopia Landlord Tabs"

                    >
                        <Tab iconPosition='start' icon={<DesignServices/>} label="Create Listing" value="1" sx={{border:2, marginRight:2, boxShadow:'10px 10px 5px  green' }} />
                        <Tab iconPosition='start' icon={<AutoStories/>}label={"My Listings ("+filteredListings?.length+")"} value="2" sx={{border:2, marginRight:2, boxShadow:'10px 10px 5px  green' }} />
                        <Tab iconPosition='start' icon={<PendingActions/>}label="Pending Requests" value="3" sx={{border:2, marginRight:2, boxShadow:'10px 10px 5px  green' }} />
                        <Tab iconPosition='start' icon={<PublishedWithChanges/>}label="Approved Requests" value="4" sx={{border:2, marginRight:2, boxShadow:'10px 10px 5px  green' }} />
                        <Tab iconPosition='start' icon={<CreditScore/>}label="Payments History" value="4" sx={{border:2, marginRight:2, boxShadow:'10px 10px 5px  green' }} />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CreateListingForm user={user } ></CreateListingForm>
                    {/* <ListingCardContainer listings ={listings} /> */}
                </TabPanel>
                <TabPanel value="2">
                    <MyListings user={user} ></MyListings>
                </TabPanel>
                <TabPanel value="3">

                </TabPanel>
                <TabPanel value="4">

                </TabPanel>
            </TabContext>
            
    );
};

export default LandlordDashboard;