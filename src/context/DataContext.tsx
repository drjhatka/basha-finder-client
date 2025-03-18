"use client"

import { getListings } from "@/app/actions/ListingActions";
import { getRequests } from "@/app/actions/RequestActions";
import { IListing } from "@/types/listing";
import { IRequest } from "@/types/request";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IProviderValues {
  listingData: IListing[] | null;
  requestData: IRequest[] | null;
  isLoading: boolean;
  fetchData: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const DataContext = createContext<IProviderValues|undefined>(undefined);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [listingData, setListingData] = useState<IListing[]|null>(null)
  const [requestData, setRequestData] = useState<IRequest[]|null>(null)
  const [isLoading, setIsLoading] = useState(true);
 
  //Get All Listings and Reqeust Data
  const fetchData = async()=>{
    const listings = await getListings();
    const requests = await  getRequests();

    if(listings.success){
      setListingData(listings?.data)
      setRequestData(requests?.data)
      setIsLoading(false)
    }
    return null
  }
  
  useEffect(() => {
      fetchData()
  }, [isLoading]);

  return (
    <DataContext.Provider value={{  listingData, requestData, fetchData, isLoading, setIsLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
