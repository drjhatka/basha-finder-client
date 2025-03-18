"use client"
import RentalRequestForm from '@/components/modules/request/RentalRequestCreateForm';
import { Grid } from '@material-ui/core';
import React from 'react';

const CreateRequestPage = () => {
  return (
    <Grid container >
      <Grid item lg={12}>
      <RentalRequestForm />
      </Grid>
    </Grid>
  );
};

export default CreateRequestPage;