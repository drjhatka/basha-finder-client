import type { Metadata } from "next";
import {Geist, Geist_Mono, Roboto} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Provider} from "react-redux";
import {store} from "@/app/redux/store";

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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      
      <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistSans.variable}  antialiased`}
        >
          <Toaster richColors position="top-center" />
          {children}
        </body>
      </html>
      </Providers>

  );
}
