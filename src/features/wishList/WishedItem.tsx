import { useDispatch } from "react-redux";
import { deleteFromWishList } from "./wishListSlice";
import { useNavigate } from "react-router-dom";
import { scrollToTheTop } from "@/utils/helper";
import WishCarousel from "./WishCarousel";
import { Button } from "@/components/ui/button";

interface WishedItemProps {
  id: number;
  name: string;
  category: string;
  ProductImages: {
    image_url: string | null;
  }[];
}

const WishedItem = ({
  wishedItem,
}: {
  wishedItem: WishedItemProps | undefined;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = wishedItem?.ProductImages.map((image) => image.image_url);

  return (
    <div className="flex flex-col  gap-2 p-4 border rounded-lg">
      <WishCarousel slides={[1, 2, 3, 4, 5]} images={images} />

      <h1 className="h-[70px] overflow-hidden ">{wishedItem?.name}</h1>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            scrollToTheTop();
            dispatch(deleteFromWishList(wishedItem?.id));
          }}
          variant="outline"
        >
          Delete From List
        </Button>
        <Button onClick={() => navigate(`/?product=${wishedItem?.id}`)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default WishedItem;
