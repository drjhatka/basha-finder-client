import { Typography } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { Button, Grid2, Input } from "@mui/material";
import { Form, Formik } from "formik";
import { Box } from "lucide-react";
import * as Yup from 'yup';
export const HeroSection = () => {
    
    
    return (
      <Grid2 size={{lg:12}}  sx={{background:"#3cb6d3"}}  >
        <Grid2 >
            <Typography variant="h4" className="py-4 text-white" align="center" >Its Time to move! </Typography>
            <Typography variant="h4" className="py-4 text-white" align="center">Search  & Find your next sweet home.! </Typography>
       
        </Grid2>
       
    <Formik
      initialValues={{ searchTerm: '' }}
    //   validationSchema={Yup.object({
    //     searchTerm: Yup.string() 
    //       .max(15, 'Must be 15 characters or less')
    //       .required('Required')

    //   })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik => (
        <form className="w-full min-h-40 px-10" style={{backgroundImage:'url("/hero-bg.svg")'}} onSubmit={formik.handleSubmit}>
          <Input
            
          className=" border-2 py-2 w-[75%] border-white bg-white"
            id="searchTerm"
            placeholder="Search Thousands of houses, apartments in major cities"
            type="text"
            {...formik.getFieldProps('searchTerm')}
          />
          {formik.touched.searchTerm && formik.errors.searchTerm ? (
            <div>{formik.errors.searchTerm}</div>
          ) : null}

          <Button type="submit" variant="contained" style={{marginLeft:16, paddingTop:13, paddingBottom:13}} size="large"><Search/> Search listing</Button>
        </form>
      )}
    </Formik>
        </Grid2>
  );
};


export default HeroSection;