import { RxCross1 } from "react-icons/rx";

const OprationButtonTypes = ({ type }: { type: string }) => {
  return (
    <>
      {type === "filter" && (
        <div className="flex whitespace-nowrap items-center px-2 py-[.4rem]  tracking-wide  gap-1 font-normal rounded-lg bg-secondary-foreground text-slate-100 mr-3 relative after:absolute after:right-[-7px] after:h-[85%] after:top-1/2 after:translate-y-[-50%] after:w-[1.5px] after:bg-black   h-7 text-xs sm:text-sm  sm:h-9 ">
          FILTER{" "}
          <span className=" w-4 h-4 sm:w-5 sm:h-5 flex justify-center items-center bg-slate-200 rounded-full text-secondary-foreground leading-10">
            {/* <FaFilter size={10} /> */} 8
          </span>
        </div>
      )}
      {type === "sort" && (
        <div className="flex items-center justify-center whitespace-nowrap  px-2 py-[.4rem]  tracking-wide  gap-1 font-normal rounded-lg bg-secondary-foreground text-slate-100 ml-3 relative after:absolute after:left-[-7px] after:h-[85%] after:top-1/2 after:translate-y-[-50%] after:w-[1.5px] after:bg-black  h-7 text-xs sm:text-sm  sm:h-9 ">
          SORT BY{" "}
          <span className="  rotate-45">
            <RxCross1 size={10} />
          </span>
        </div>
      )}
    </>
  );
};

export default OprationButtonTypes;
