import { useUser } from "@/context/UserContext";
import { IAuthState } from "@/lib/actions/authSlice";
import { RootState } from "@/lib/store";
import { getCurrentUser } from "@/services/AuthService";
import { NextResponse, NextRequest } from "next/server";
import { useSelector } from "react-redux";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Use a stable version
  typescript: true,
});

export async function POST(req: NextRequest) {
   // const user:IAuthState|null =  useSelector((state:RootState) => state.rootReducers.auth as IAuthState |null)  ; 
  const user = await getCurrentUser()
  console.log('user', user)
  try {
    const { amount } = await req.json(); // Fix: Directly extract 'amount'

    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const customer = await stripe.customers.create({
      name: user?.name,
      email: user?.email,
      description: '',
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "cad",
      customer:customer.id,
      
    });
    




    //create invoice...
    
    const invoice = await stripe.invoices.create({
      customer: customer.id,  //save this id to request transaction id
      collection_method: 'send_invoice',
      days_until_due: 30,
    });
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      unit_amount:amount*100,
      currency: "cad",
      description: "Payment for listing",
      invoice: invoice.id,
    });
    console.log('invoice', invoice, invoiceItem)
    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const paymentIntentId = url.searchParams.get("paymentIntentId");
  console.log('s', paymentIntentId)
  
  try {
    // Fetch the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
    
    // Return payment intent status
    return new NextResponse(JSON.stringify(paymentIntent), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to retrieve payment intent", { status: 400 });
  }
}
