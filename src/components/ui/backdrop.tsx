"use client"
import { Backdrop, CircularProgress } from "@mui/material";
import { ReactNode, useState } from "react";

const BackdropElement = ({children, open, handleClose}:{children:ReactNode,open:boolean, handleClose:()=>void}) => {
    
    return (
        
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                 {children}
            </Backdrop>
        
    );
};

export default BackdropElement;