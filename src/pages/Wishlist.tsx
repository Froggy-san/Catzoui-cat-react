import ListedWishs from "@/features/wishList/ListedWishs";
import WishHeader from "@/features/wishList/WishHeader";

const WishList = () => {
  return (
    <div className="container px-[1rem]">
      <WishHeader />
      <ListedWishs />
    </div>
  );
};

export default WishList;
