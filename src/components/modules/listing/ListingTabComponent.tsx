"use client"
import React, {SyntheticEvent, useState} from 'react';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box} from "@mui/system";
import {Tab} from "@mui/material";
import ListingCardContainer from "@/components/modules/listing/ListingCardContainer";
import {IListing} from "@/types/listing";
import RequestCardContainer from '../request/ReqestCardContainer';
import LandlordApprovedRequestCardContainer from '../request/LandlordApprovedRequestContainer';
import { useCancelRequestMutation, useGetRequestsByTenantIdQuery } from '@/lib/api/requestApi';
import { IAuthState } from '@/lib/actions/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { IRequest } from '@/types/request';
import { toast } from 'sonner';

const ListingTabComponent = ({listings}:{listings:IListing[]|[]}) => {
    //retrieve user..
    const user:IAuthState|null =  useSelector((state:RootState) => state.rootReducers.auth ) ; 
    
    const handleCancelRequest =async(requestId:string)=>{
        const [cancelRequest,{}] = await useCancelRequestMutation()
        const response = await cancelRequest(requestId)
        if(response.data){
            //refetch()
            toast.error("Request Cancelled")
        }
    }
    
    // retrieve approved and pending requests based on tenant ID
    const {data:pendingRequests, isLoading:pendingLoading, refetch:pendingRefetch} = useGetRequestsByTenantIdQuery({tenantId:user?._id, status:'pending'})
    const {data:approvedRequests, isLoading:pendinLoading, refetch:approvedRefetch} = useGetRequestsByTenantIdQuery({tenantId:user?._id, status:'approved'})
    
    //set default value for tab panel
    const [value, setValue] = useState<string>('1');
    //define handle change event
    const handleChange = (event:SyntheticEvent<Element, Event>, newValue:string) => {
        setValue(newValue); // Update the active tab
    };
    return (
            <TabContext   value={value} >
                <Box boxShadow={"25px"} borderBottom={2} sx={{ borderBottom: 1, display: 'flex', justifyContent: 'center' }}>
                    <TabList onChange={handleChange} aria-label="Rentopia Tenant Tabs">
                        <Tab label="Book Listings" value="1" />
                        <Tab label={"Pending Requests ("+listings?.length+")"} value="2" />
                        <Tab label="Approved Requests" value="3" />
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
                    <LandlordApprovedRequestCardContainer requests={data?.data?.filter((item:IRequest)=>item.status=='approved')} isLoading={isLoading} refetch={refetch}  ></LandlordApprovedRequestCardContainer>

                </TabPanel>
                <TabPanel value="4">

                </TabPanel>
            </TabContext>
    );
};

export default ListingTabComponent;