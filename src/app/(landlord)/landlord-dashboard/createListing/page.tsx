"use client"
import React from 'react';
import CreateListingForm from "@/components/modules/listing/CreateListingForm";
import { IAuthState } from '@/lib/actions/authSlice';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const CreateListingPage = () => {
    const user:IAuthState|null =  useSelector((state:RootState) => state.rootReducers.auth ) as IAuthState |null ;
    
    return (
        <div>
            <CreateListingForm user={user} />
        </div>
    );
};

export default CreateListingPage;