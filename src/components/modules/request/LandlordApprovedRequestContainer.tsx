"use client"
import { IRequest } from "@/types/request";
import LandlordApprovedRequestCard from "./LandlordApprovedRequestCard";
import MUIDataAlert from "@/components/shared/DataAlert";

const LandlordApprovedRequestCardContainer =({requests, isLoading, refetch}:{requests:IRequest[], isLoading:boolean, refetch:()=>void}) => {
    return ( 
        <div className={'grid md:grid-cols-2 lg:grid-cols-3 md:gap-5'}>
            { !isLoading && !requests?.length && 
                <MUIDataAlert button={false} title="You haved no Approved Requests" btnTxt="" btnHref=""/>
            }
            {
                !isLoading && requests?.map((request:IRequest)=>
                     <LandlordApprovedRequestCard request={request} handleCheckout={()=>{}} key={'approved Requests'}></LandlordApprovedRequestCard>
                )
            }      
    </div>
)}

export default LandlordApprovedRequestCardContainer;