"use client"

import { getListings } from "@/app/actions/ListingActions";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { IListing } from "@/types/listing";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IListingProviderValues {
  data: IListing[] | null;
  isLoading: boolean;
  fetchListingData: (data: IListing[] | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const DataContext = createContext<IListingProviderValues | undefined>(undefined);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<IListing[]|null>(null)
  const [isLoading, setIsLoading] = useState(true);

 
  const fetchListingData =async()=>{
    const listings = await getListings();
    if(listings.success){
      setData(listings.data)
      setIsLoading(false)
    }
    return null
  }
  // const fetchRequestData =async()=>{
  //   const requests = await get();
  //   if(listings.success){
  //     setData(listings.data)
  //     setIsLoading(false)
  //   }
  //   return null
  // }
  
  useEffect(() => {
      fetchListingData()
  }, [isLoading]);

  return (
    <DataContext.Provider value={{  data, fetchListingData, isLoading, setIsLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(DataContext);

  if (context == undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default DataProvider;
