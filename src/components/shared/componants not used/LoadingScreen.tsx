import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center space-x-2 h-[100dvh]  ">
      <div className="flex flex-col justify-center items-center w-[150px] h-[150px]  px-3 py-5 rounded-xl bg-oldCatBg">
        <AiOutlineLoading3Quarters className=" animate-spin" size={50} />
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
