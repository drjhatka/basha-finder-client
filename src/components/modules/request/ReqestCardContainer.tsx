"use client"
import RequestCard from "./RequestCard";
import { IRequest } from "@/types/request";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Alert, AlertTitle, Button } from "@mui/material";
import MUIDataAlert from "@/components/shared/DataAlert";

const RequestCardContainer = (
    { requests, isLoading, handleCancelRequest }:
        { requests: IRequest[], isLoading: boolean, handleCancelRequest: () => void }) => {

    //retrieve current user
    const user = useSelector((state: RootState) => state.rootReducers.auth);

    return (
        <div className={'grid md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
            {/* Show alert if no requests available */}
            {
                !isLoading && !requests?.length && <MUIDataAlert title="No Requests Available right now!" button={false} btnHref="" btnTxt="" />
            }
            {/* Show avilable requests */}
            {
                !isLoading && requests?.map((request: IRequest) => {
                    return <RequestCard handleCancelRequest={handleCancelRequest} key={request._id} request={request}></RequestCard>
                })
            }
        </div>
    );
};

export default RequestCardContainer;