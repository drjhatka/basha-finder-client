import type { Metadata } from "next";
import {Geist, Geist_Mono, Roboto} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import  {ReduxProvider} from "@/providers/ReduxProviders";
import Providers from "@/providers/UserProvider";
import NavbarUI from "@/components/shared/NavbarUI";
import { Grid2 } from "@mui/material";
import DataProvider from "@/context/DataContext";
import Footer from "@/components/shared/Footer";
import UserProvider from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const roboto = Roboto({
  variable:"--font-roboto",
  weight:'700',
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Basha Finder",
  description: "Ultimate Rental Buddy!",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
 
}>) {
  return (
      <html lang="en">
        <body
          className={`${roboto.variable}   antialiased`}
        >
          <Toaster richColors position="top-center" />
          <DataProvider>
            <UserProvider>
                <ReduxProvider>
                  <NavbarUI></NavbarUI>
                  <Grid2 container marginTop={10} px={5} py={2}>
                    {children}
                    
                  </Grid2>
                  <Footer></Footer>
                </ReduxProvider> 
                </UserProvider>
                </DataProvider>  
        </body>
      </html>



  );
}
