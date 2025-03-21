"use client"
import { Backdrop,  } from "@mui/material";
import { ReactNode } from "react";

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