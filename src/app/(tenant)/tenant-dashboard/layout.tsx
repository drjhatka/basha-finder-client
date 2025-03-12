import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {Geist, Geist_Mono, Roboto} from "next/font/google";

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
const TenantLayout = ({ children }: { children: React.ReactNode }) => {

    return (
    <>

      <main className={`${geistSans.variable} ${geistMono} min-h-screen`}>{children}</main>
      <Footer />
    </>
  );
};

export default TenantLayout;
