import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import NavbarUI from "@/components/shared/NavbarUI";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUI />
      <main className="min-h-screen">{children}</main>
      
    </>
  );
};

export default CommonLayout;
