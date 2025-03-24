"use client"
import { getAllPaymentsByTenantID } from "@/app/actions/PaymentActions";
import { IPayment } from "@/types/payment";
import { useEffect, useState } from "react";
import PaymentInfoCard from "../payment/LandlordPaymentHitoryCard";

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {
                payments?.map(payment=><PaymentInfoCard payment={payment} key={payment._id}></PaymentInfoCard>)
            }
        </div>
    );
};

export default PaymentHistoryContainer;