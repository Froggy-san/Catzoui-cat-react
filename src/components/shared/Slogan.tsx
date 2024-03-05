import React from "react";

const Slogan = () => {
  return (
    <div className=" absolute bottom-[100px] left-1/2 translate-x-[-50%]    min-w-[95%] sm:min-w-[320px] sm:left-16  sm:translate-x-0 max-w-[450px] break-words">
      <div className=" relative px-3 py-2 rounded-lg bg-gray-50/50 backdrop-blur-xl">
        <img
          src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/logo-2.png"
          className="w-[100px] absolute sm:left-[-50px] top-[-76px]"
        />
        <h1 className=" tracking-wide text-md sm:text-xl">
          Welcome to <span className=" text-teal-500">Catzoui-Cat</span>
          's Online store,where a higher form of shopping exists.
          <br />
          Have you been looking for something day and night
          <span className=" text-teal-500 font-semibold">?!</span> worry not we
          got you covered, here you can buy the best for a{" "}
          <span className="font-semibold text-teal-500">whole lot less!.</span>{" "}
          <span className=" text-teal-500">“</span>Our online shopping
          experience can’t be described anything less of{" "}
          <span className=" text-teal-500 font-semibold">purrrrfect!</span>
          <span className=" text-teal-500">”</span>
        </h1>
      </div>
    </div>
  );
};

export default Slogan;
