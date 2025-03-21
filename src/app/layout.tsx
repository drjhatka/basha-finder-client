import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import  {ReduxProvider} from "@/providers/ReduxProviders";
import NavbarUI from "@/components/shared/NavbarUI";
import DataProvider from "@/context/DataContext";
import Footer from "@/components/shared/Footer";
import UserProvider from "@/context/UserContext";

const roboto = Roboto({
  variable:"--font-roboto",
  weight:'700',
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
                  <NavbarUI/>
                  <div className="mt-20">

                    {children}     

                  </div>
                  <Footer/>
                </ReduxProvider> 
                </UserProvider>
                </DataProvider>  
        </body>
      </html>



  );
}
