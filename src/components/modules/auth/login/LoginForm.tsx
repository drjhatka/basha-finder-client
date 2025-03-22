"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentUser, loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useState} from "react";
import { useRouter } from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";
import {setUser} from "@/lib/actions/authSlice";
import { Button, CircularProgress } from "@mui/material";
import BackdropElement from "@/components/ui/backdrop";

export default function LoginForm() {
   const [open, setOpen] = useState<boolean>(false)
      const handleClose =()=>{
          setOpen(!open)
      }
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch()
 // const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    try {
      setOpen(true)
      const res = await loginUser(data);
      console.log('res', res)

      //if logged in...
      if (res?.success) {
        toast.dismiss(res?.message);
        //get current user...
        const currentUser = await getCurrentUser()

      console.log("Current user", currentUser)
        //create user in redux store...
        dispatch(setUser(currentUser))
        //redirect user to home page based on role...

        switch (currentUser.role) {
          case ('admin'):setTimeout(()=>{
            router.push('/admin-dashboard');
          },1000)
                break;
          case ('landlord'):setTimeout(()=>{
            router.push('/landlord-dashboard');
          },1000)
                break;
          case ('tenant'):setTimeout(()=>{
            router.push('/tenant-dashboard');
          },1000)
          break;
        }//end switch
        setOpen(false)
      }//end if
      if(res.success.err){
        toast.error(res.errorSources[0].message);

      }
    }//end try
    catch (err) {
      //@ts-expect-error error could be of any type
      toast.error(err.message);
      console.error(err);
    }//end catch
  };//end function

  return (
    <>
    {
      open ?     <BackdropElement open={open} handleClose={handleClose} >
        <CircularProgress color="inherit" />
      </BackdropElement>:
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        {/* <Logo /> */}
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field}  value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex mt-3 w-full">
            {/* <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY}
              onChange={handleReCaptcha}
              className="mx-auto"
            /> */}
          </div>

          <Button
            disabled={isSubmitting}
            variant="contained"
            type="submit"
            className="mt-5 w-full"
            //startIcon={<Circle></Circle>}
          >
            {isSubmitting ? "Logging In...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
    }
</>
  );
}
