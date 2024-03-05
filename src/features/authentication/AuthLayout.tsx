import { Outlet, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const showDia = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(showDia);
  }, []);

  return (
    <div className=" my-28 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-5 relative">
        <h1 className="text-2xl tracking-wider relative">
          <img
            src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/logo-2.png"
            alt="cat-logo"
            className=" w-28 absolute left-[-87px] top-[-50px]  z-10 "
          />
          <span className="z-20"> CATZOUI-CAT</span>
        </h1>
        {/* <BarBorder className="top-[100px] min-w-80   max-w-4xl" /> */}
      </div>
      <div className=" w-[98%]  sm:w-[650px] mx-auto mt-12 px-6 py-4 rounded-2xl border">
        <Outlet />
      </div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5 leading-6 text-md">
              Welcome to <span className=" text-teal-500">CATZOUI-CAT</span>,
              for testing here is an admin account. Other wise feel free to
              create your very own account.
            </DialogTitle>
            <DialogDescription>
              <div>
                <strong>Email:</strong> <span>admin1@yahoo.com</span>
              </div>
              <div>
                <strong>Password:</strong> <span>admin123456789</span>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthLayout;
