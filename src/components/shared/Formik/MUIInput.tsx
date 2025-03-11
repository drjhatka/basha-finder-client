"use client"
import React from 'react';
import Grid from "@mui/material/Grid2";
import {Field} from "formik";

interface IProps<T> {
    label:string,
    inputId:string,
    type:T,
    inputType:string,
    size?:{xs?:number, sm?:number, md?:number, lg?:number}
}

const MuiInput = ({config}:{config:IProps<any>}) => {
    const [value, setValue] = React.useState('');
    const {label, inputId, inputType, type, size} =config;
    return(
    <Grid  component={'div'} size={size}  sx={{ marginBottom:4}} >
        <Field
            fullWidth
            sx={{color:'green'}}
            label={label}

            variant="outlined"
            type={inputType}
            name={inputId}
            value={value}
            component={type}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>{setValue(e.target.value)}}
        />
    </Grid>
    )
};

export default MuiInput;