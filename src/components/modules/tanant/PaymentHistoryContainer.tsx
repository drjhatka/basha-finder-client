"use client"
import { getAllPaymentsByTenantID } from "@/app/actions/PaymentActions";
import { IPayment } from "@/types/payment";
import { useEffect, useState } from "react";

const PaymentHistoryContainer = ({userId}:{userId:string}) => {
    const [payments, setPayments ] = useState<IPayment[]>()
    useEffect(()=>{
        async function getPaymentDataByTenant(tenantId:string){
           const paymentData= await getAllPaymentsByTenantID(tenantId)
           console.log('pay', paymentData)
           if(paymentData.success){
            setPayments(paymentData.data)
           }

        }
        getPaymentDataByTenant(userId)
    },[])
    console.log('pay', payments)
    return (
        <div>
            {payments?.length}
        </div>
    );
};

export default PaymentHistoryContainer;