"use client"
import LoginForm from "@/components/modules/auth/login/LoginForm";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const currentUser = useUser()
  const router = useRouter()
  if(currentUser && currentUser?.user?.role=='tenant'){
    return router.push("/tenant-dashboard")
    
  }
  if(currentUser && currentUser?.user?.role=='landlord'){
    return router.push("/landlord-dashboard")
    
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
