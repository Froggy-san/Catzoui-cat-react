import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const LoadingScreen = () => {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center space-x-2  ">
      <div className="flex h-[150px] w-[150px] flex-col items-center justify-center  rounded-xl bg-oldCatBg px-3 py-5">
        <AiOutlineLoading3Quarters className=" animate-spin" size={50} />
        <h1>Loading...</h1>
      </div>
    </div>
  )
}

export default LoadingScreen
