import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export const MuiDatePicker = ({label, name}:{label:string, name:string}) => {
    return (
        <Grid component={'div'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                name={name}
                sx={{width:'100%'}}
                label={label}
            />
            </LocalizationProvider>
        </Grid>
    );
};

export default MuiDatePicker;