import NavbarUI from "@/components/shared/NavbarUI";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="grid ">
        <NavbarUI></NavbarUI>
        <div className="mt-16 w-[93%] mx-auto py-5">
        {children}
            
        </div>
        </div>;
  };
  
  export default PublicLayout;
  