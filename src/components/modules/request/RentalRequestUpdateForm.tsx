"use client";

import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid2, TextField, Typography } from "@mui/material";
import { toast } from "sonner";
import { DoneOutline, Edit, Home, Loop } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IAuthState } from "@/lib/actions/authSlice";
import { useContext, useState} from "react";
import { DataContext } from "@/context/DataContext";
import { useCreateRequestMutation, useUpdateRequestMutation } from "@/lib/api/requestApi";
import Image from "next/image";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BackdropElement from "@/components/ui/backdrop";
import { useRouter } from "next/navigation";
import { request } from "http";
import { InputLabel } from "@material-ui/core";


const RentalRequestUpdateForm = () => {
  const data = useContext(DataContext)
  const requests = data?.requestData
  const listings = data?.listingData
  const requestId = useParams().requestId;
  const router= useRouter()
  const authUser: IAuthState | null = useSelector((state: RootState) => state.rootReducers.auth) as IAuthState | null;

  //const filteredListings = listings?.find(item => item._id == listingId)
  const filteredRequest = requests?.find(item => item._id == requestId )

  console.log(filteredRequest)
  const [updateRequest, { isLoading, isSuccess }] = useUpdateRequestMutation()

  const [open, setOpen] = useState(true)
  const handleClose =()=>{
    if(!data?.isLoading){
      setOpen(false)
    }
  }
  const onSubmit = async (values: FormikValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const updatedRequest = {
        message: values.message,
        requestDate: values.requestDate,
        moveInDate: values.moveInDate,
        //tenantPhone: '',
        tenantEmail: authUser?.email
      }
       const res =await updateRequest({id:requestId ,body:updatedRequest})
        console.log(res)
      toast.success("Rental request updated successfully!");
      //router.push('/tenant-dashboard?tab=2')
      resetForm();
    } catch (error) {
      toast.error("Failed to submit request.");
      console.log(error)
    }
  }

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      message: filteredRequest?.message,
      requestDate: filteredRequest?.requestDate,
      moveInDate: filteredRequest?.moveInDate ? new Date(filteredRequest.moveInDate).toISOString().split("T")[0] : "", // Default to empty string if null or undefined ,
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
      moveInDate: Yup.date()
    }),
    onSubmit: onSubmit,
  });

  return (
<>
    { data?.isLoading ? <BackdropElement open={open} handleClose={handleClose} ><CircularProgress></CircularProgress></BackdropElement>:
    <Box   className="bg-white lg:w-[50%] mx-auto px-10 py-10 mt-5" component="form" onSubmit={formik.handleSubmit} >
            <Breadcrumb links={[
              {
                href:'/tenant-dashboard',
                icon:<Home></Home>,
                title:'Home'
              },
              {
                href:'/tenant-dashboard?tab=2',
                icon:<Edit></Edit> ,
                title:' Update Request'
              }
            ]}></Breadcrumb>

      <Typography variant="h5" gutterBottom>
        Update Rental Request 
      </Typography>

      {/* Message */}
      <InputLabel>Message</InputLabel>
      <TextField
        fullWidth
        
        name="message"
        multiline
        rows={3}
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        sx={{ mb: 2 }}
      />

      {/* ✅ Move-in Date Field */}
      <TextField
        label="Move-in Date"
        name="moveInDate"
        type="date"
        sx={{ marginBottom: '20px' }}
        fullWidth
        //defaultValue={filteredRequest?.message}
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
        <Grid2 spacing={2}>
          {/* ✅ Submit Button */}
          <Button disabled={isSuccess} startIcon={isLoading && <Loop />} endIcon={isSuccess && <DoneOutline />} type="submit" variant="contained" size="large" color="warning">
            {
              isLoading ? "Submitting..." : (isSuccess ? "Updated Request Submitted" : "Update Request")
            }
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  }
  </>
  );
};

export default RentalRequestUpdateForm;
