import { Skeleton } from "@/components/ui/skeleton";
import ProductLoading from "./ProductLoading";

function ProductDetailsLoading({ className }: { className?: string }) {
  return (
    <Skeleton
      className={`bg-transparent w-full h-full gap-5 
        flex flex-col gap-y-24 lg:flex-row ${className}`}
    >
      <ProductLoading className=" w-full xs:px-6 sm:px-20 lg:px-0 lg:w-[550px]" />

      <div className="flex flex-col gap-5 flex-1 ">
        <div className=" h-4 rounded-2xl bg-oldCatBg"></div>
        <div className="flex items-center h-4 rounded-2xl gap-4 ">
          <span className=" w-[60px] h-4 rounded-2xl bg-oldCatBg"></span>
          <span className=" w-[60px] h-4 rounded-2xl bg-oldCatBg"></span>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="w-[80%]  h-4 bg-oldCatBg rounded-xl"></div>
          <div className="w-[15%]  h-4 bg-oldCatBg rounded-xl"></div>
          <div className="w-[65%]  h-4 bg-oldCatBg rounded-xl"></div>
          <div className="w-[20%]  h-4 bg-oldCatBg rounded-xl"></div>
          <div className="w-[10%]  h-4 bg-oldCatBg rounded-xl"></div>
          <div className="w-[80%]  h-4 bg-oldCatBg rounded-xl"></div>
        </div>

        <div className="flex flex-col gap-5 mt-7">
          <div className="flex justify-between items-center">
            <div className="w-[150px] h-4 rounded-xl bg-oldCatBg"></div>
            <div className="w-[150px] h-3 rounded-xl bg-oldCatBg"></div>
          </div>

          <div className="flex flex-col gap-4 mt-7">
            <div className="w-[50px] h-4 rounded-xl bg-oldCatBg"></div>

            <div className="flex gap-5">
              <span className="w-[40px] h-[35px] rounded-md bg-oldCatBg"></span>
              <span className="w-[40px] h-[35px] rounded-md bg-oldCatBg"></span>
              <span className="w-[45px] h-[35px] rounded-md bg-oldCatBg"></span>
              <span className="w-[45px] h-[35px] rounded-md bg-oldCatBg"></span>
              <span className="w-[45px] h-[35px] rounded-md bg-oldCatBg"></span>
            </div>
          </div>

          <div className="flex gap-1">
            <span className="h-10 w-[87%] rounded-md bg-oldCatBg"></span>
            <span className="h-10 flex-1 rounded-md bg-oldCatBg"></span>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}

export default ProductDetailsLoading;
