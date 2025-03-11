"use client"
import React, {SyntheticEvent} from "react"
import {
    Button,
    Card,
    CardHeader,
    Divider,
    InputLabel,
    TextField
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import {Formik, Form, Field, FieldArray} from "formik"
import * as Yup from "yup"
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {MinusIcon, Plus} from "lucide-react";
import {MultipleImageUploadField} from "@/components/shared/Formik/MultipleImageUploadField";

//Initial Data
const initialValues = {
    title: "",
    description: "",
    beds: null,
    baths: null,
    type: "apartment",
    category: "long-term",
    rent:null,
    amenities:[''],
    availableFrom: null,
    availableUntil: null,
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
    type:Yup.string().required("Required"),
    category:Yup.string().required("Required"),
    availableFrom:Yup.date().required("Required"),
    availableUntil:Yup.date().required("Required"),
    rent:Yup.number().required("Required"),
    amenities:Yup.array().required("Required"),
    images:Yup.object({
        file:Yup.string().required("Required"),
    }).required("At Least One Image is required")
})

const CreateListingForm = () => {
    //const classes = useStyle()

    const onSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Grid component={'div'}  container  spacing={1}>
            <Grid component={'div'} size={{xs:12, md:12, lg:12}} >
                <Card className={''}>
                    <Grid component={'div'} style={{border:'2px solid', marginTop:10}}  >
                        <CardHeader title="Create A Rental Listing" sx={{boxShadow:'2px 4px 2px 2px #001'}}></CardHeader>
                        <Divider sx={{boxShadow:'2px 4px 2px #001'}} ></Divider>
                    </Grid>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            validateOnBlur={true}
                            onSubmit={(values,  { setSubmitting  }) => {
                                console.log('values',values.images, setSubmitting)
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    //setSubmitting(false);
                                }, 400);
                            }}
                            >
                            { ({setFieldValue,touched, handleChange, errors, values })  => (
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
                                                    variant="filled"
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
                                            <Grid component={'div'}  size={{xs:12, sm:12, md:12,lg: 12}}
                                                  spacing={2}>
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


                                            {/*Multiple Image Upload Field with Previews*/}
                                            <Grid component={'div'} size={{sm:12, md:12, lg:12}}>
                                                <MultipleImageUploadField name='images' />
                                            </Grid>
                                            <Grid component={'div'}>


                                            </Grid>
                                            {JSON.stringify(values)}
                                            <Grid component={'div'} sx={{margin:'auto'}} size={{xs:6,lg:6}}>
                                                <Button type={'submit'} fullWidth variant={'contained'} color={'success'}>Create
                                                    Listing</Button>
                                            </Grid>

                                        </Grid>

                                </Form>
                            )}
                        </Formik>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CreateListingForm


