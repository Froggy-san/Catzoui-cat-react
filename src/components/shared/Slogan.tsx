import React from 'react'

const Slogan = () => {
  return (
    <div className=" absolute bottom-[100px] left-1/2 min-w-[95%] max-w-[450px]   translate-x-[-50%] select-none break-words  sm:left-16 sm:min-w-[320px] sm:translate-x-0">
      <div className=" relative rounded-lg bg-gray-50/50 px-3 py-2 backdrop-blur-xl">
        <img
          src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/logo-2.png"
          className="absolute top-[-76px] w-[100px] sm:left-[-50px]"
        />
        <h1 className=" text-xs tracking-wide sm:text-xl">
          Welcome to <span className=" text-teal-500">Catzoui-Cat</span>
          's Online store,where a higher form of shopping exists.
          <br />
          Have you been looking for something day and night
          <span className=" font-semibold text-teal-500">?!</span> worry not we
          got you covered, here you can buy the best for a{' '}
          <span className="font-semibold text-teal-500">whole lot less!.</span>{' '}
          <span className=" text-teal-500">“</span>Our online shopping
          experience can’t be described anything less of{' '}
          <span className=" font-semibold text-teal-500">purrrrfect!</span>
          <span className=" text-teal-500">”</span>
        </h1>
      </div>
    </div>
  )
}

export default Slogan
