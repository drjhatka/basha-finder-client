"use client";

import FilterBar from "@/components/shared/FilterBar";
import HeroSection from "@/components/shared/HeroSection";
import {useContext} from "react";
import {DataContext} from "@/context/DataContext";
import { Divider } from "@mui/material";

const HomePage = () => {
    const contextData = useContext(DataContext)
  return (
    <>
        {
            !contextData?.isLoading &&<HeroSection listings={contextData?.listingData} />
        }

      
       <FilterBar/>
       <Divider></Divider>

      
        
       </>
    

    
  );
};

export default HomePage;
