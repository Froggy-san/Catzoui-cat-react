import UpdateAccount from "@/features/authentication/UpdateAccount";
import UpdatePassword from "@/features/authentication/UpdatePassword";
import { MdOutlineSettingsAccessibility } from "react-icons/md";
import { PiPasswordThin } from "react-icons/pi";

const Account = () => {
  return (
    <div className=" w-[94%]  max-w-[700px] mx-auto">
      <div className="flex items-center justify-center gap-3 mt-36 mb-9">
        {" "}
        <MdOutlineSettingsAccessibility size={35} />{" "}
        <span className="text-2xl font-semibold">User Settings</span>
      </div>
      <UpdateAccount />

      <div className="flex items-center justify-center gap-3 mt-36 mb-9">
        {" "}
        <PiPasswordThin size={35} />{" "}
        <span className="text-2xl font-semibold">Update Password</span>
      </div>
      <UpdatePassword />
    </div>
  );
};

export default Account;
