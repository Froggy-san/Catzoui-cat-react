import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const WishLoading = memo(() => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="flex flex-col gap-3 bg-transparent" key={index}>
          <div className="relative h-[500px] rounded-md bg-oldCatBg">
            <div className=" absolute bottom-2 left-1/2 flex translate-x-[-50%] gap-1 rounded-md bg-slate-200 px-2 py-1">
              <span className=" h-4 w-4 rounded-full bg-slate-300"></span>
              <span className=" h-4 w-4 rounded-full bg-slate-300"></span>
              <span className=" h-4 w-4 rounded-full bg-slate-300"></span>
              <span className=" h-4 w-4 rounded-full bg-slate-300"></span>
            </div>
          </div>

          <div className="flex flex-col gap-2" key={index}>
            <div className="h-[30px] rounded-md bg-oldCatBg"></div>
            <div className="h-[30px] rounded-md bg-oldCatBg"></div>
          </div>
        </Skeleton>
      ))}
    </>
  )
})

export default WishLoading
