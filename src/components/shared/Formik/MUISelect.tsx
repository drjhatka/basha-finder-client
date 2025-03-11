"use client"
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, {FormEvent, useState} from "react";
import Grid from "@mui/material/Grid2";
import {InputLabel, MenuItem} from "@mui/material";

interface ISelectProps {
    options:{ label: string; value: string; }[],
    label: string;
    inputId: string;
    selectValue: string;
    size?:{md?:number,lg?:number,sm?:number}
}


export default function MUISelect({config}:{config:ISelectProps}) {
    const [value, setValue] = useState('');
    const {options,label,inputId, selectValue, size} = config;

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    const handleBlur =(event: FormEvent) => {
        console.log(event);
    }
    return (
        <Grid component={'div'} size={{ xs:12, sm:6, md:3, lg:12}}>
                <InputLabel id="demo-simple-select-outlined-label">

                    {label}
                </InputLabel>
            <FormControl fullWidth variant="filled" size={'small'}>
                <Select

                    labelId="demo-simple-select-outlined-label"
                    id={inputId}
                    label={label}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    defaultValue={'apartment'}
                    size={"small"}
                    name={inputId}>
                    {options.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
}