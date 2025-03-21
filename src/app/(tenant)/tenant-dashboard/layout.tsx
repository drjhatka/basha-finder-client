import DataProvider from "@/context/DataContext";
import { Geist_Mono, Roboto } from "next/font/google";

const roboto = Roboto({
    variable: "--font-roboto",
    weight: '700',
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
const TenantLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <DataProvider>
                <main className={`${roboto.variable} ${geistMono} min-h-screen`}>{children}</main>
            </DataProvider>
        </>
    );
};

export default TenantLayout;
