"use client";

import { Field, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Checkbox, FormControlLabel, Grid2, MenuPaper, Paper, TextField, Typography } from "@mui/material";
import { toast } from "sonner";
import { Approval, ApprovalRounded, DoneOutline, Loop } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IAuthState } from "@/lib/actions/authSlice";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { useCreateRequestMutation } from "@/lib/api/requestApi";


interface RentalRequestFormProps {
  onSubmit: (values: any) => Promise<void>;
}

// const RentalRequestForm = ({ onSubmit }: RentalRequestFormProps) => {
const RentalRequestCreateForm =() => {
    const data = useContext(DataContext)
    const listings = data?.data
    const listingId = useParams().listingId;
    const authUser:IAuthState|null = useSelector((state:RootState) => state.rootReducers.auth);
    const filteredListings = listings?.filter(item=>item._id==listingId)
    const [createRequest, {isLoading, isError, isSuccess}]=useCreateRequestMutation()

    const onSubmit =  async(values:FormikValues, {resetForm}:{resetForm:()=>void})=>{
        try {
          const newRequest = {
            listingId:listingId,
            tenantId:authUser?.userId,
            landlordId:filteredListings[0]?.landlordId,
            message:values.message,
            requestDate:values.requestDate,
            moveInDate:values.moveInDate,
            tenantPhone:'',
            tenantEmail:authUser?.email
          }
          const res = await  createRequest(newRequest)
          // if(res.success){
          // }
          console.log(res) 
            toast.success(JSON.stringify(newRequest))
            // toast.success("Rental request submitted successfully!");
             //resetForm();
           } catch (error) {
             toast.error("Failed to submit request.");
           }
    }

  const formik = useFormik({
    initialValues: {
      message: "",
      requestDate: new Date().toISOString().split("T")[0], // Default to today
        moveInDate: new Date().toISOString().split("T")[0],
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
      moveInDate:Yup.date()
    }),
    onSubmit: onSubmit,
  });

  return (
    <Box mx={'auto'} width={'100%'} gap={5} border={2} component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 500, margin: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create Rental Request
      </Typography>



      {/* Message */}
      <TextField
        fullWidth
        label="Message"
        name="message"
        multiline
        rows={3}
        //value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        sx={{ mb: 2 }}
      />
  {/* ✅ Message Field */}
 

            {/* ✅ Move-in Date Field */}
             <TextField
              label="Move-in Date"
              name="moveInDate"
              type="date"
              sx={{marginBottom:'20px'}}
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.moveInDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.moveInDate && Boolean(formik.errors.moveInDate)}
              helperText={formik.touched.moveInDate && formik.errors.moveInDate}
            />
            <FormControlLabel
            control={
            <Checkbox 
            required
            color="primary"
            />
            }
            label="I accept the terms and conditions"
            />

        <Grid2 >
          <Grid2  spacing={2}>
            {/* ✅ Submit Button */}
            <Button disabled={isSuccess} startIcon={isLoading && <Loop/>} endIcon={isSuccess && <DoneOutline></DoneOutline>} type="submit" variant="contained" size="large" color="warning">
              {
                isLoading ? "Submitting...":(isSuccess?"Request Submitted":"Submit Request")
              }
              
            </Button>{
                isSuccess && <Button  variant="contained" sx={{marginLeft:"30px"}} color="error" size="large">Cancel Request</Button>

            }
             </Grid2>
             </Grid2>
    </Box>
  );
};

export default RentalRequestCreateForm;
