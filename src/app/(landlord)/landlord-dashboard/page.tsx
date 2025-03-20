"use client"
import { approveRequest, rejectRequest } from '@/app/actions/RequestActions';
import CreateListingForm from '@/components/modules/listing/CreateListingForm';
import MyListings from '@/components/modules/listing/MyListings';
import LandlordRequestCardContainer from '@/components/modules/request/LandlordRequestCardContainer';
import { DataContext } from '@/context/DataContext';
import { IAuthState } from '@/lib/actions/authSlice';
import { useGetRequestsByLandlordIDQuery } from '@/lib/api/requestApi';
import { RootState } from '@/lib/store';
import { IListing } from '@/types/listing';
import { IRequest } from '@/types/request';
import { AutoStories, CreditScore, DesignServices, PendingActions, PublishedWithChanges } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, AlertTitle, Box, Tab } from '@mui/material';
import React, { SyntheticEvent, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const LandlordDashboard = () => {
        const data = useContext(DataContext)
         //find only with landlord id listings
         const listings:IListing[]|null = data?.listingData  as IListing[]
        const requests:IRequest[]|null = data?.requestData as IRequest[]
        
        const handleApprove =async(requestId:string)=>{
            console.log("RR", requestId)
            const res = await approveRequest(requestId)
            toast.success("Request has been approved!")
        }
        const handleReject = async(requestId:string)=>{
            console.log("RR", requestId)
            const res = await rejectRequest(requestId)
            toast.error("Request Rejected")
        }

        const user:IAuthState|null =  useSelector((state:RootState) => state.rootReducers.auth ) as IAuthState |null ;
        const {data:pendingRequests, isLoading:pendingLoading, refetch:pendingRefetch} =  useGetRequestsByLandlordIDQuery({id:user?.userId,status:'pending'} )
        const {data:approvedRequests,  isLoading:approvedLoading, refetch:approvedRefetch} = useGetRequestsByLandlordIDQuery({id:user?.userId,status:'approved'} )
        const {data:completedRequests,  isLoading:completedLoading, refetch:completedRefetch} = useGetRequestsByLandlordIDQuery({id:user?.userId,status:'completed'} )
        console.log('pending', approvedRequests)
         
        const filteredListings = listings?.filter(item=>item.landlordId==user?.userId)
         const filteredRequests = requests?.filter(item=> item.landlordId== user?.userId)
        const [value, setValue] = useState("1");
        const handleChange = (event:SyntheticEvent<Element, Event>, newValue:string) => {
            setValue(newValue); // Update the active tab
        };
    return (
            <TabContext   value={value} >
                <Box  sx={{ borderBottom: 1, display: 'flex', width:'100%', justifyContent: 'center' }}>
                    <TabList onChange={handleChange} aria-label="Rentopia Landlord Tabs"

                    >
                        <Tab iconPosition='start' icon={<DesignServices/>} label="Create Listing" value="1" sx={{border:2, marginRight:1, boxShadow:'10px 10px 5px  gray' }} />
                        <Tab iconPosition='start' icon={<AutoStories/>}label={"My Listings ("+filteredListings?.length+")"} value="2" sx={{border:2, marginRight:1, boxShadow:'10px 10px 5px gray' }} />
                        <Tab iconPosition='start' icon={<PendingActions/>}label="Pending Requests" value="3" sx={{border:2, marginRight:1, boxShadow:'10px 10px 5px  gray' }} />
                        <Tab iconPosition='start' icon={<PublishedWithChanges/>}label="Approved Requests" value="4" sx={{border:2, marginRight:1, boxShadow:'10px 10px 5px  gray' }} />
                        <Tab iconPosition='start' icon={<CreditScore/>}label="Bookings History" value="5" sx={{border:2, marginRight:1, boxShadow:'10px 10px 5px  gray' }} />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CreateListingForm user={user as IAuthState} ></CreateListingForm>
                    {/* <ListingCardContainer listings ={listings} /> */}
                </TabPanel>
                <TabPanel value="2">
                    <MyListings user={user} ></MyListings>
                </TabPanel>
                <TabPanel value="3">
                    {
                        pendingRequests?.data.length>0 ? <LandlordRequestCardContainer requests={pendingRequests.data} refetch={pendingRefetch} isLoading={pendingLoading} />:
                        <Alert sx={{width:'100%'}} severity="info">
                                            <AlertTitle>You have no requests!</AlertTitle>
                                            
                                        </Alert>
                        
                    }

                </TabPanel>
                <TabPanel value="4">
                {
                        approvedRequests?.data.length>0 ? <LandlordRequestCardContainer requests={approvedRequests.data} refetch={approvedRefetch} isLoading={approvedLoading} />:
                        <Alert sx={{width:'100%'}} severity="info">
                                            <AlertTitle>You have no requests!</AlertTitle>
                                            
                                        </Alert>
                        
                    }

                </TabPanel>
                <TabPanel value="5">
                
                {
                        completedRequests?.data.length>0 ? <LandlordRequestCardContainer requests={completedRequests.data} refetch={completedRefetch} isLoading={completedLoading} />:
                        <Alert sx={{width:'100%'}} severity="info">
                                            <AlertTitle>You have no requests!</AlertTitle>
                                            
                                        </Alert>
                        
                    }
                </TabPanel>
            </TabContext>
            
    );
};

export default LandlordDashboard;