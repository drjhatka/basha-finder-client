"use client";

import FilterBar from "@/components/shared/FilterBar";
import HeroSection from "@/components/shared/HeroSection";
import {useContext} from "react";
import {DataContext} from "@/context/DataContext";

const HomePage = () => {
    const contextData = useContext(DataContext)
  return (
    <>
        {
            !contextData?.isLoading &&<HeroSection listings={contextData?.listingData} />
        }

      
       <FilterBar/>

      
        
       </>
    

    
  );
};

export default HomePage;
