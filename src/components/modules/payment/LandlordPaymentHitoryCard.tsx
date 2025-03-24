"use client";

import React, { FC } from "react";
import { Card, CardContent, Typography, Grid, Chip, Divider, Box } from "@mui/material";
import { CreditCard, Money, CheckCircle, Cancel, HourglassEmpty, Error } from "@mui/icons-material";
import { IPayment } from "@/types/payment"; // Adjust the path if needed

interface PaymentInfoCardProps {
  payment: IPayment;
}

const PaymentInfoCard: FC<PaymentInfoCardProps> = ({ payment }) => {
  // Map status to color and icon
  const statusConfig: Record<IPayment["status"], { color: "success" | "warning" | "error" | "default"; icon: React.ReactElement }> = {
    Paid: { color: "success", icon: <CheckCircle fontSize="small" /> },
    Pending: { color: "warning", icon: <HourglassEmpty fontSize="small" /> },
    Failed: { color: "error", icon: <Error fontSize="small" /> },
    Cancelled: { color: "default", icon: <Cancel fontSize="small" /> },
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", boxShadow: 3, borderRadius: 3, p: 2, bgcolor: "#f8f9fa" }}>
      <CardContent>
        {/* Payment Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Payment Details
        </Typography>
        
        {/* Status Badge */}
        <Chip 
          label={payment.status} 
          color={statusConfig[payment.status].color} 
          icon={statusConfig[payment.status].icon}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ mb: 2 }} />

        {/* Payment Info */}
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Amount:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">${payment.amount/100}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Method:
            </Typography>
          </Grid>
          <Grid item xs={6} display="flex" alignItems="center">
            {payment.method === "Online" ? (
              <CreditCard fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
            ) : (
              <Money fontSize="small" sx={{ mr: 1, color: "green" }} />
            )}
            <Typography>{payment.method}</Typography>
          </Grid>

          {payment.transactionId && (
            <>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Transaction ID:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize="small">{payment.transactionId}</Typography>
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Date:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{new Date(payment.createdAt ?? "").toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentInfoCard;