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
