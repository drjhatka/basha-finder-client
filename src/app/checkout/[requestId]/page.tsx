"use client";
import CheckoutForm from "@/components/modules/payment/CheckoutForm";
import { DataContext } from "@/context/DataContext";
import { IListing } from "@/types/listing";
import { IRequest } from "@/types/request";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Grid } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckOutPageWithParams = () => {
    const { requestId } = useParams();
    const contextData = useContext(DataContext)
    //extract request 
    const req = contextData?.requestData?.find(item => item._id == requestId)
    //extract listing 
    //@ts-ignore
    const listing = contextData?.listingData?.find(item => item._id == req?.listingId._id)
    const rent = listing?.rent
    return (
        <div className="">
            <Elements stripe={stripe}> 
                <CheckoutForm listing={listing as IListing} request={req as IRequest} />
            </Elements>
        </div>
    );
};

export default CheckOutPageWithParams;