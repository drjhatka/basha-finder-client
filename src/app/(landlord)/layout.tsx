const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <><main className="min-h-screen bg-slate-50">{children}</main></>
  );
};

export default CommonLayout;
