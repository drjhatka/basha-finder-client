"use client";

import FilterBar from "@/components/shared/FilterBar";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  //const user = useUser();
  //console.log(user);
  return (
    <>
      <HeroSection ></HeroSection>
      <FilterBar></FilterBar>
      <Footer></Footer>
    </>

    
  );
};

export default HomePage;
