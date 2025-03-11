import {ReactNode} from "react";
import {FieldHookConfig} from "formik";

export interface FormikTextInputProps extends FieldHookConfig<string> {
    label: string;
}

export interface FormikSelectProps extends FieldHookConfig<string> {
    id: string;
    name: string;
    label: string;
    children: ReactNode;
}