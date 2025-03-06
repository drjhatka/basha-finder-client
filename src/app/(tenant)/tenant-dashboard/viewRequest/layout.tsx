import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {ReactNode} from "react";

const TenantLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
};

export default TenantLayout;
