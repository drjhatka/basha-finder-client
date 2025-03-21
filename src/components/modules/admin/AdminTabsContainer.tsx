"use client"
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import { DataContext } from '@/context/DataContext';
import { Dashboard } from '@mui/icons-material';
import AdminListingCardContainer from './AdminListingCardContainer';
import { getAllUsers } from '@/app/actions/UserActions';
import { TUser } from '@/types';
import AdminUserCardContainer from './AdminUserCardContainer';

const AdminTabsContainer = () => {
    const [value, setValue] = useState<string>('1');
    //Load All Listings and Users from data and user context...
    const dataContext = useContext(DataContext);
    const [dbUsers, setDBUsers] = useState<TUser[]|undefined>()

    const listings = dataContext?.listingData || [];
    
    useEffect(()=>{
        async function getUsers (){
            const users = await getAllUsers("")
            setDBUsers(users.data)
        }
         getUsers()
    },[])
    console.log('users', dbUsers)
    //define handle change event
    const handleChange = (event: SyntheticEvent<Element, Event>, newValue: string) => {
        setValue(newValue); // Update the active tab
    };

    return (
        <TabContext value={value} >
            <Box width={'100%'} display={'flex'} marginTop={4} justifyContent={'center'} >
                <TabList onChange={handleChange} aria-label="Rentopia Tenant Tabs">
                    <Tab className='flex gap-2' icon={<Dashboard></Dashboard>} label="Dashboard" value="1" />
                    <Tab label="Manage Listings" value="2" />
                    <Tab label="Manage Users" value="3" />
                    <Tab label="Manage Payments" value="4" />
                </TabList>
            </Box>
            <TabPanel value="1">
                {/* <ListingCardContainer listings ={listings} isLoading={isLoading} /> */}
            </TabPanel>

            <TabPanel value="2">
                <AdminListingCardContainer listings={listings}></AdminListingCardContainer>
            </TabPanel>

            <TabPanel value="3">
                <AdminUserCardContainer key={'users'} users={dbUsers} ></AdminUserCardContainer>
            </TabPanel>
            <TabPanel value="4">

            </TabPanel>
        </TabContext>
    );
};

export default AdminTabsContainer;