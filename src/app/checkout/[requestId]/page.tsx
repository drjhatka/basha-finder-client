"use client";
import CheckoutForm from "@/components/modules/payment/CheckoutForm";
import { DataContext } from "@/context/DataContext";
import { IListing } from "@/types/listing";
import { IRequest } from "@/types/request";
import { Chip } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckOutPageWithParams = () => {
    const { requestId } = useParams();
    const contextData = useContext(DataContext)
    //extract request 
    const req = contextData?.requestData?.find(item => item._id == requestId)
    //extract listing 
    //@ts-expect-error item is of type any
    const listing = contextData?.listingData?.find(item => item._id == req?.listingId._id)
    return (
        <>
        
        <div className=" grid shadow-lg md:grid-cols-2 bg-white">
            <div className="grid  gap-3 mx-auto  mt-2">
                <div>
                    <Image src={listing?.images[0] as string} width={250} height={50} alt="rental image"></Image>
                </div>
                <div className="mt-4 text-orange-800 text-lg">
                    <strong>{listing?.title}</strong>
                </div>
                <div>
                    <Chip color="error" variant="outlined" label={'Rent:'+listing?.rent}>
                    </Chip>
                    
                </div>
                <div>
                    Confirm ${listing?.rent} Payment for {listing?.title}
                    
                </div>
                
            </div>
            <div className="shadow-lg">
                <Elements stripe={stripe}> 
                    <CheckoutForm listing={listing as IListing} request={req as IRequest} />
                </Elements>
            </div>
        </div>

    
        </>
    );
};

export default CheckOutPageWithParams;