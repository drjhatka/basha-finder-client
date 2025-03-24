"use client"
import LoginForm from "@/components/modules/auth/login/LoginForm";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const currentUser = useUser()
  const router = useRouter()

  useEffect(() => {
    if (currentUser?.user?.role === "tenant") {
      router.push("/tenant-dashboard"); // Navigate after render
    }
    if(currentUser && currentUser?.user?.role=='landlord'){
      return router.push("/landlord-dashboard")
   }
   if(currentUser && currentUser?.user?.role=='admin'){
      return router.push("/admin-dashboard")
   }
  }, [currentUser, router]); // Runs when `currentUser` changes



  return (
    <div className="h-screen bg-white w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
