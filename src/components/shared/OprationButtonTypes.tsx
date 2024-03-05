import { RxCross1 } from 'react-icons/rx'

const OprationButtonTypes = ({ type }: { type: string }) => {
  return (
    <>
      {type === 'filter' && (
        <div className="relative mr-3 flex h-7 items-center  gap-1  whitespace-nowrap rounded-lg bg-secondary-foreground px-2 py-[.4rem] text-xs font-normal tracking-wide text-slate-100 after:absolute after:right-[-7px] after:top-1/2 after:h-[85%] after:w-[1.5px]   after:translate-y-[-50%] after:bg-black sm:h-9  sm:text-sm ">
          FILTER{' '}
          <span className=" flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 leading-10 text-secondary-foreground sm:h-5 sm:w-5">
            {/* <FaFilter size={10} /> */} 8
          </span>
        </div>
      )}
      {type === 'sort' && (
        <div className="relative ml-3 flex h-7  items-center justify-center  gap-1  whitespace-nowrap rounded-lg bg-secondary-foreground px-2 py-[.4rem] text-xs font-normal tracking-wide text-slate-100 after:absolute after:left-[-7px] after:top-1/2 after:h-[85%] after:w-[1.5px]  after:translate-y-[-50%] after:bg-black sm:h-9  sm:text-sm ">
          SORT BY{' '}
          <span className="  rotate-45">
            <RxCross1 size={10} />
          </span>
        </div>
      )}
    </>
  )
}

export default OprationButtonTypes
