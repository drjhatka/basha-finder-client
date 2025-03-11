/*
"use client"
import {useField} from "formik";
import {Autocomplete, Input, InputLabel, TextField} from "@mui/material";
import {TextareaAutosize} from "@mui/base";
import Grid from "@mui/material/Grid2";
import {DatePicker} from "@mui/x-date-pickers";

const styles ={
    //border:'2px solid #123123',
    width:'100%',
    boxShadow:'0px 1px 2px #123abc',
    padding:'10px',
    borderRadius:5,
}

export const FormikTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Grid component={'div'}   >
            <InputLabel className={'font-small text-blue-800'}  htmlFor={props.id || props.name}>{label}</InputLabel>
            {props.as === "textarea" ? (
                <TextareaAutosize style={styles} {...field} {...props} />
            ) : (
                <Input style={{ border:'2px solid gray', padding:'10px', boxShadow:'1px 2px 4px #123233'}} fullWidth {...field} {...props} />
            )}
            {meta.touched && meta.error ? (
                <div className="error" style={{ color: "red" }}>
                    {meta.error}
                </div>
            ) : null}
        </Grid>
    );
};

// @ts-ignore
export const FormikSelect = ({ label, ...props  }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <InputLabel className={'font-normal text-blue-800'} htmlFor={props.id || props.name}>{label}</InputLabel>
            <select {...field} {...props}  className={'py-3 border-2 border-blue-600 px-4 flex justify-center font-semibold text-blue-700 shadow-lg  w-full'} />
            {meta.touched && meta.error ? (
                <div className="text-red-700">{meta.error}</div>
            ) : null}
        </div>
    );
};

// @ts-ignore
export  const FormikCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently from other input types: select and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};
export  const FormikDatePicker = ({  ...props }) => {
    // React treats radios and checkbox inputs differently from other input types: select and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className={'px-4 border-2'}>
            <InputLabel >{props.label}</InputLabel>

            <input className={'border-2 w-full border-blue-700 shadow-xl py-2 px-2'} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="text-red-700">{meta.error}</div>
            ) : null}
        </div>
    );
};
export  const FormikMultiSelect = ({  ...props }) => {
    // React treats radios and checkbox inputs differently from other input types: select and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [ meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className={'px-4 border-2'}>
            <InputLabel >{props.label}</InputLabel>

            {meta.touched && meta.error ? (
                <div className="text-red-700">{meta.error}</div>
            ) : null}
        </div>
    );
};*/
