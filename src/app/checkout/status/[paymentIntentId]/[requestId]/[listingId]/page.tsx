"use client";

import { updateListingStatus } from "@/app/actions/ListingActions";
import { createPayment } from "@/app/actions/PaymentActions";
import { completeRequest } from "@/app/actions/RequestActions";
import Receipt from "@/components/modules/payment/Receipt";
import { IAuthState } from "@/lib/actions/authSlice";
import { RootState } from "@/lib/store";
import { Button } from "@mui/material";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface PaymentStatus {
  id: string;
  status: string;
  amount: number;
}

const PaymentStatusPage = () => {
  const { paymentIntentId, requestId, listingId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const user: IAuthState | null = useSelector((state: RootState) => state.rootReducers.auth as IAuthState | null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (paymentIntentId) {
        const response = await fetch(`/api/create-payment-intent?paymentIntentId=${paymentIntentId}`);
        const data = await response.json();

        setPaymentStatus(data);
        //change request status
        await completeRequest(requestId as string);
        //change listing to booked
        await updateListingStatus(listingId as string);
        //create payment in db
        await createPayment({ tenantId: user?.userId, listingId: listingId, requestId: requestId, transactionId: data.id, amount: data.amount })
      }
    };

    fetchPaymentStatus();
  }, [paymentIntentId]);

  // 🔹 Function to Generate & Download PDF
  const handleDownload = async () => {
    try {
      const blob = await pdf(
        <Receipt
          customerEmail={user?.email as string}
          customerName={user?.name as string}
          paymentAmount={paymentStatus?.amount as number}
          paymentDate={new Date().toISOString()}
          paymentIntentId={paymentIntentId as string}
          paymentStatus={paymentStatus?.status || "Unknown"}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "payment_receipt.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="mt-20 bg-white">
      {paymentStatus ? (
        <div>
          <div className="flex text-red-700 flex-col justify-center items-center gap-5">
            <h1>Payment Status: {paymentStatus.status}</h1>
            <p>Transaction ID: {paymentStatus.id}</p>
            <p>Status: {paymentStatus.status}</p>
          </div>

          <div className="grid mx-24 lg:grid-cols-2 mt-8" style={{ width: "100vw", height: "100%" }}>
            {/* 🔹 PDF Viewer (For Display) */}
            <PDFViewer height={window.innerHeight} width="100%" style={{ transform: "scale(1)", transformOrigin: "top left", border: "none" }}>
              <Receipt
                customerEmail={user?.email as string}
                customerName={user?.name as string}
                paymentAmount={paymentStatus?.amount as number}
                paymentDate={new Date().toISOString()}
                paymentIntentId={paymentIntentId as string}
                paymentStatus={paymentStatus?.status || "Unknown"}
              />
            </PDFViewer>

            {/* 🔹 Button to Download Receipt */}
            <div className=" flex justify-center items-start mt-20">
              <Button onClick={handleDownload} variant="contained">
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentStatusPage;
