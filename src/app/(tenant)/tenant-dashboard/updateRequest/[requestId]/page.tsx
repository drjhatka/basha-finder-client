"use client"
import RentalRequestUpdateForm from '@/components/modules/request/RentalRequestUpdateForm';
import { Grid } from '@material-ui/core';
import React from 'react';

const UpdateRequestPage = () => {
  
  return (
    <Grid container >
      <Grid item lg={12}>
      <RentalRequestUpdateForm></RentalRequestUpdateForm>
      </Grid>
    </Grid>
  );
};

export default UpdateRequestPage;