"use client"
import { IListing } from "@/types/listing";
import { IRequest } from "@/types/request";
import { Button, Box } from "@mui/material";
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({listing, request}:{listing:IListing, request:IRequest}) => {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) return;

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: (listing?.rent) }),
      });
      console.log('error', response)
      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Read the error response
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error("Client Secret not returned from API");
      }

      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },

        //return_url:'/checkout/status'
      });


      if (paymentResult.error) {
        console.error("Payment error:", paymentResult.error.message);
      } 
      else if (paymentResult.paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentResult.paymentIntent);
        window.location.href = "/checkout/status/"+paymentResult.paymentIntent.id+"/"+request._id+"/"+listing._id; // Redirect manually
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Box className="mt-40 p-4 border-2 rounded-md max-w-lg mx-auto">
        <Box className="mb-10 border-b-2" color={'red'}>
            Confirm ${listing?.rent} Payment for {listing?.title}
                            
        </Box>
      <form onSubmit={onSubmit}>
        {/* Card Number Input */}
        <Box className="mb-4">
          <label className="block mb-1 text-gray-600">Card Number</label>
          <CardNumberElement className="border p-3 w-full" />
        </Box>

        {/* Expiry Date Input */}
        <Box className="mb-4">
          <label className="block mb-1 text-gray-600">Expiry Date</label>
          <CardExpiryElement className="border p-3 w-full" />
        </Box>

        {/* CVC Input */}
        <Box className="mb-4">
          <label className="block mb-1 text-gray-600">CVC</label>
          <CardCvcElement className="border p-3 w-full" />
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
            Pay Now
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
