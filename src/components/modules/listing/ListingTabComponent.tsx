"use client"
import React, {SyntheticEvent, useState} from 'react';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box} from "@mui/system";
import {Tab} from "@mui/material";
import ListingCardContainer from "@/components/modules/listing/ListingCardContainer";
import {IListing} from "@/types/listing";
import RentalRequestForm from '../request/RentalRequestCreateForm';
import RequestCardContainer from '../request/ReqestCardContainer';

const ListingTabComponent = ({listings}:{listings:IListing[]|[]}) => {
    const [value, setValue] = useState<string>('1');
    const handleChange = (event:SyntheticEvent<Element, Event>, newValue:string) => {
        setValue(newValue); // Update the active tab
    };

    return (
            <TabContext   value={value} >
                <Box boxShadow={"25px"} borderBottom={2} sx={{ borderBottom: 1, display: 'flex', justifyContent: 'center' }}>
                    <TabList onChange={handleChange} aria-label="Rentopia Tenant Tabs">
                        <Tab label="Book Listings" value="1" />
                        <Tab label="My Requests" value="2" />
                        <Tab label="My Orders" value="3" />
                        <Tab label="My Payments" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ListingCardContainer listings ={listings} />
                </TabPanel>
                <TabPanel value="2">
                    <RequestCardContainer></RequestCardContainer>
                </TabPanel>
                <TabPanel value="3">

                </TabPanel>
                <TabPanel value="4">

                </TabPanel>
            </TabContext>
    );
};

export default ListingTabComponent;