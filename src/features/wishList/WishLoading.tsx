import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WishLoading = memo(() => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="flex flex-col gap-3 bg-transparent" key={index}>
          <div className="h-[500px] bg-oldCatBg rounded-md relative">
            <div className=" absolute left-1/2 translate-x-[-50%] bottom-2 flex gap-1 px-2 py-1 rounded-md bg-slate-200">
              <span className=" w-4 h-4 rounded-full bg-slate-300"></span>
              <span className=" w-4 h-4 rounded-full bg-slate-300"></span>
              <span className=" w-4 h-4 rounded-full bg-slate-300"></span>
              <span className=" w-4 h-4 rounded-full bg-slate-300"></span>
            </div>
          </div>

          <div className="flex flex-col gap-2" key={index}>
            <div className="h-[30px] bg-oldCatBg rounded-md"></div>
            <div className="h-[30px] bg-oldCatBg rounded-md"></div>
          </div>
        </Skeleton>
      ))}
    </>
  );
});

export default WishLoading;
