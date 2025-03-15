import RentalRequestForm from '@/components/modules/request/RentalRequestCreateForm';
import { Grid2 } from '@mui/material';
import React from 'react';

const CreateRequestPage = () => {
    return (
<Grid2  component="div" border={2} sx={{ width: "100%", display: "flex" }}>
  <Grid2 border={2} sx={{ flexGrow: 1 }}>
    <RentalRequestForm />
  </Grid2>
</Grid2>
    );
};

export default CreateRequestPage;