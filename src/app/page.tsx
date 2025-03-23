"use client";

import FilterBar from "@/components/shared/FilterBar";
import HeroSection from "@/components/shared/HeroSection";
import {useContext, useState} from "react";
import {DataContext} from "@/context/DataContext";
import { CircularProgress, Divider } from "@mui/material";
import BackdropElement from "@/components/ui/backdrop";

const HomePage = () => {
    const contextData = useContext(DataContext)
    const [open, setOpen] = useState(true)
    const handleClose =()=>{
      if(!contextData?.isLoading){
        setOpen(false)
      }
    }
  return (
    <>
    
        {
            contextData?.isLoading?<BackdropElement open={open} handleClose={handleClose}> <CircularProgress></CircularProgress></BackdropElement> :<><HeroSection listings={contextData?.listingData} />
            <FilterBar/>
            <Divider></Divider></>
        }

      
   

      
        
       </>
    

    
  );
};

export default HomePage;
