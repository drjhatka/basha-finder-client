import React, { useState } from "react"
import {
    Button,
    Card,
    CardHeader,
    Collapse,
    Divider,
    Fade,
    InputLabel,
    TextField
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import {Formik, Form, Field, FieldArray, FormikValues} from "formik"
import * as Yup from "yup"
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {MinusIcon, Plus} from "lucide-react";
import {MultipleImageUploadField} from "@/components/shared/Formik/MultipleImageUploadField";
import {extractUrlArrayFromImages} from "@/lib/utils";
import { useCreateListingMutation } from "@/lib/api/listingApi";
import { AutoFixHigh } from "@mui/icons-material";
import { toast } from "sonner";
import { IUser } from "@/types";
import { Typography } from "@material-ui/core";
import { IAuthState } from "@/lib/actions/authSlice";

//Initial Data
const initialValues = {
    title: "test",
    description: "test",
    beds: 3,
    baths: 2,
    location:'default',
    type: "apartment",
    category: "long-term",
    rent:300,
    amenities:['test'],
    availableFrom: '2025-01-01',
    availableUntil: '2025-01-05',
    images:[]
}

const typeOptions = [
    {label:'Select Type', value:''},
    { label: "Apartment", value: "apartment" },
    { label: "Condo", value: "condo" },
    { label: "Residence", value: "house" },
]
const leaseOptions = [
    { label: "Long-Term", value: "long-term" },
    { label: "Short-Term", value: "short_term" },
]
//validation schema
const validationSchema = Yup.object({
    title: Yup.string().required("Required").min(2,'Min 1 character'),
    description: Yup.string().required("Required"),
    beds: Yup.number().required("Required").max(10).min(1),
    baths: Yup.number().required("Required").max(10),
    location:Yup.string().required("Required"),
    type:Yup.string().required("Required"),
    category:Yup.string().required("Required"),
    availableFrom:Yup.date().required("Required"),
    availableUntil:Yup.date().required("Required"),
    rent:Yup.number().required("Required"),
    amenities:Yup.array().required("Required"),
    images:Yup.array(Yup.object({
        file:Yup.string().required("Required"),
    }).required("At Least One Image is required"))
})

const CreateListingForm = ({user}:{user:IAuthState|null}) => {
    const [openForm, setOpenForm] = useState(false)
    const [createPost ]= useCreateListingMutation()
    const onSubmit = async(values: FormikValues) => {
        const imgList = extractUrlArrayFromImages(values.images);
        const newListing ={...values, images:imgList,landlordId:user?.userId, availability:'available'};
        const result = await createPost(newListing);
        if(result?.data){
            toast.success('Listing Created Successfully')
            return
        }
        toast.error('Something Went Wrong, Please Try Again!')
    }

    return (
        <Grid component={'div'}  container  spacing={1}>
            <Button   onClick={()=>setOpenForm(!openForm)} variant="contained">{openForm?"Close Listing Form":"Open Listing Form"}</Button>
            <Collapse in={openForm} component={'div'}>
            <Fade in appear>
                <Grid  component={'div'} boxShadow={5} border={1} size={{xs:12, md:12, lg:12}} >
                <Card className={'px-4 bg-slate-100'}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            //validateOnBlur={true}
                            onSubmit={onSubmit}
                            >
                            { ({setFieldValue,touched, handleChange, errors, values, isSubmitting })  => (
                                <Form >
                                        <Grid container className={'py-5  px-10'} spacing={3}>
                                            {/*Title Field*/}
                                            <Grid component={'div'} size={{xs: 12, md: 6, lg: 6}}>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    label="Title"
                                                    variant={'filled'}
                                                    sx={{
                                                        "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                    }}
                                                    name="title"
                                                    id={'title'}
                                                    onChange={handleChange}
                                                    error={ touched.title && Boolean(errors.title)} // ✅ Show error if touched
                                                    helperText={touched.title && errors.title} // ✅ Display error message
                                                />

                                            </Grid>

                                            {/*Description Field*/}
                                            <Grid component={'div'} size={{xs: 12, md: 6, lg: 6}}>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    label="Description"
                                                    variant="filled"
                                                    sx={{
                                                        "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                    }}
                                                    name="description"
                                                    id="description"
                                                    onChange={handleChange}
                                                    error={touched.description && Boolean(errors.description)} // ✅ Show error if touched
                                                    helperText={touched.description && errors.description} // ✅ Display error message
                                                />
                                            </Grid>

                                            {/*No of Beds Field*/}
                                            <Grid component={'div'} size={{xs: 12, sm:6, md:6, lg: 3}}>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    label="No of Beds"
                                                    variant="filled"
                                                    sx={{
                                                        "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                    }}
                                                    name="beds"
                                                    id="beds"
                                                    onChange={handleChange}
                                                    error={touched.beds && Boolean(errors.beds)} // ✅ Show error if touched
                                                    helperText={touched.beds && errors.beds}
                                                />
                                            </Grid>

                                            {/*No of Baths Field*/}
                                            <Grid component={'div'} size={{xs: 12, sm:6, md:6, lg: 3}}>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    label="No of Baths"
                                                    variant="filled"
                                                    sx={{
                                                        "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                    }}
                                                    name="baths"
                                                    id="baths"
                                                    onChange={handleChange}
                                                    error={touched.baths && Boolean(errors.baths)} // ✅ Show error if touched
                                                    helperText={touched.baths && errors.baths}
                                                />
                                            </Grid>

                                            <Grid component={'div'} size={{xs: 12, sm:6, md:6, lg: 6}}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                label="Location"
                                                variant={'filled'}
                                                sx={{
                                                    "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                }}
                                                name="location"
                                                id={'location'}
                                                onChange={handleChange}
                                                error={ touched.location && Boolean(errors.location)} // ✅ Show error if touched
                                                helperText={touched.location && errors.location} // ✅ Display error message
                                            />

                                        </Grid>
                                            {/*Rental Types Select Field*/}
                                            <Grid component={'div'}
                                                  className={'flex flex-col  md:flex-row gap-3 items-center'}
                                                  size={{xs: 12, sm: 12, md: 6, lg: 3}}>
                                                <InputLabel >Type</InputLabel>
                                                <Field
                                                    label={'Select Rental Type'}
                                                    component={'select'}
                                                    as={'select'}
                                                    name="type"
                                                    value={values.type}
                                                    onChange={handleChange}
                                                    className={'w-[100%]  text-center sm:w-[100%] border-2 py-3 rounded-xs border-green-400 md:w-[70%] lg:w-[80%] px-5 justify-center font-semibold'}
                                                >

                                                    {typeOptions.map((option) => (
                                                        <option className={' border-2 px-4  justify-center text-bold'} key={option.label}
                                                                value={option.value}>{option.label}</option>))}
                                                </Field>
                                            </Grid>

                                            {/*Rental Category Select Field*/}
                                            <Grid component={'div'}
                                                  className={'flex flex-col  md:flex-row gap-3 items-center'}
                                                  size={{xs: 12, sm: 12, md:6, lg: 3}}>
                                                <InputLabel color={'warning'}>Contract</InputLabel>
                                                <Field
                                                    label={'Select Lease Category'}
                                                    component={'select'}
                                                    as={'select'}
                                                    name="category"
                                                    className={'w-[100%]  text-center sm:w-[100%] border-2 py-3 rounded-xs border-green-400 md:w-[70%] lg:w-[70%] px-5 justify-center font-semibold'}
                                                    onChange={handleChange}
                                                    sx={{
                                                        "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                    }}

                                                >

                                                    {leaseOptions.map((option) => (
                                                        <option
                                                            className={'py-3 w-[50%] border-2 px-4 flex justify-center text-bold'}
                                                            key={option.label}>{option.label}</option>))}
                                                </Field>
                                            </Grid>

                                            {/*Available From Date Picker*/}
                                            <Grid component={'div'} size={{xs: 12, sm: 12, md: 3, lg: 3}}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>

                                                    <Field
                                                        fullWidth
                                                        component={DatePicker}
                                                        as={'date-picker'}
                                                        label="Available From"
                                                        variant="filled"
                                                        name="availableFrom"
                                                        className={' w-[100%] font-semibold'}
                                                        sx={{
                                                            "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                            "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                        }}
                                                        onChange={(date:Date) => setFieldValue("availableFrom", date)}
                                                        error={ touched.availableFrom && Boolean(errors.availableFrom)} // ✅ Show error if touched
                                                        helperText={touched.availableFrom && errors.availableFrom}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>

                                            {/*Available Until Date Picker*/}
                                            <Grid component={'div'} size={{xs: 12, sm: 12, md: 3, lg: 3}}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={'en'} >
                                                    <Field
                                                        fullWidth
                                                        component={DatePicker}
                                                        as={'date-picker'}
                                                        label="Available Until"
                                                        variant="filled"
                                                        name="availableUntil"
                                                        className={' w-[100%] font-semibold'}
                                                        sx={{
                                                            "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                            "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                        }}
                                                        onChange={(date:Date) => setFieldValue("availableUntil", date)}
                                                        error={ touched.availableUntil && Boolean(errors.availableUntil)} // ✅ Show error if touched
                                                        helperText={touched.availableUntil && errors.availableUntil}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>

                                            {/*Rent Field*/}
                                            <Grid component={'div'} className={'md:flex items-center gap-4'}
                                                  size={{xs: 12, sm: 12, md: 3, lg: 6}}>
                                                <Field
                                                    component={TextField}
                                                    label={'Monthly Rent'}
                                                    type="number"
                                                    name="rent"
                                                    id={'rent'}
                                                    variant="filled"
                                                    onChange={handleChange}
                                                    sx={{
                                                        "& .MuiInputLabel-root": { color: "blue" }, // Default label color
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "red" }, // Label color when focused
                                                    }}
                                                    className={'w-full'}
                                                    error={ touched.rent && Boolean(errors.rent)} // ✅ Show error if touched
                                                    helperText={touched.rent && errors.rent}
                                                />
                                            </Grid>

                                            {/*Amenities Multi Input Field*/}
                                            <Grid component={'div'} container className="w-full border-2"  size={{xs:12, sm:12, md:12,lg: 12}}
                                                  spacing={2}>
                                                    <Grid  size={{lg:12}} >
                                                <InputLabel>Add Amenities</InputLabel>
                                                <FieldArray
                                                    name={'amenities'}
                                                    render={(arrayHelpers) => (
                                                        <div>
                                                            {
                                                                values.amenities && values.amenities.length > 0 ? (
                                                                    values.amenities.map((amenities, index) => (
                                                                        <Grid key={index}
                                                                              className={'grid md:grid-cols-2 mb-2 w-full  lg:grid-cols-3 gap-2'}>
                                                                            <Field component={TextField}
                                                                                   fullWidth
                                                                                   name={`amenities.${index}`}

                                                                                   value={values.amenities[index] || ''}
                                                                                   onChange={(e: { target: { value: string; }; }) => {
                                                                                       const newValue = [...values.amenities];
                                                                                       newValue[index] = e.target.value;
                                                                                       setFieldValue("amenities", newValue); // Ensure Formik updates state
                                                                                   }}
                                                                            >

                                                                            </Field>

                                                                            <Grid className={'flex gap-5'}>
                                                                                <Button type={'button'}
                                                                                        variant={'contained'}
                                                                                        color={'success'}
                                                                                        onClick={() => arrayHelpers.push('')}
                                                                                        startIcon={<Plus/>}>Add</Button>
                                                                                <Button
                                                                                    variant={'contained'}
                                                                                    color={'error'}
                                                                                    type={'button'}
                                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                                    startIcon={
                                                                                        <MinusIcon/>}>Delete</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    ))
                                                                ) : (
                                                                    <Button variant={'contained'} type={'button'}
                                                                            onClick={() => arrayHelpers.push('')}>Add
                                                                        Amenities</Button>
                                                                )
                                                            }
                                                        </div>
                                                    )}
                                                >
                                                </FieldArray>
                                                </Grid>
                                            </Grid>


                                            {/*Multiple Image Upload Field with Previews*/}
                                            <Grid component={'div'} size={{sm:12, md:12, lg:12}}>
                                                <MultipleImageUploadField name='images' />
                                                {
                                                    errors.images && <div>{errors.images}</div>
                                                }
                                            </Grid>
                                            <Grid component={'div'}>


                                            </Grid>
                                            {JSON.stringify(values)}
                                            <Grid component={'div'} sx={{margin:'auto'}} size={{xs:6,lg:6}}>
                                                <Button type={'submit'}  fullWidth
                                                        variant={isSubmitting?'outlined':'contained'} color={isSubmitting?'error':'success'} startIcon={<AutoFixHigh/>}>
                                                    {
                                                        isSubmitting ? 'Creating...': 'Create Listing'
                                                    }</Button>
                                            </Grid>

                                        </Grid>

                                </Form>
                            )}
                        </Formik>
                </Card>
            </Grid>
            </Fade>
            </Collapse>
        </Grid>
    )
}

export default CreateListingForm


