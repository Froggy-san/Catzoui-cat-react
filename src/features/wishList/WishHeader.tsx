import { useUser } from "../authentication/useUser";
import { TiHeartFullOutline } from "react-icons/ti";

const WishHeader = () => {
  const { user } = useUser();
  return (
    <div className="text-2xl my-24 font-semibold flex items-center justify-center gap-3">
      <span>{user?.user_metadata.username + "'s"} Wish list</span>{" "}
      <TiHeartFullOutline size={30} />{" "}
    </div>
  );
};

export default WishHeader;
