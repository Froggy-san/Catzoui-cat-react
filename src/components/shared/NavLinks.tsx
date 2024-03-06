import { useMemo } from 'react'
import useCategories from '@/features/products/useGetAllCategories'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-scroll'
import { SCROLL_DURATION } from '@/utils/constants'

import { RiArrowDropDownLine } from 'react-icons/ri'

const NavLinks = () => {
  const { allCategories } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()

  const allCat = useMemo(() => {
    return [...new Set(allCategories?.map((pro) => pro.category))]
  }, [allCategories])

  function handleFilterByCategory(field: string, value: string) {
    searchParams.set(field, value)
    setSearchParams(searchParams)
  }

  return (
    <ul className="md:text-md z-50 hidden h-full   items-center gap-3 font-light  lg:flex">
      <li className="group relative flex h-full cursor-pointer items-center transition-transform duration-300 hover:translate-y-[-2px]">
        CATEGORY{' '}
        <span className="transition-transform  duration-300 group-hover:rotate-180">
          <RiArrowDropDownLine size={19} />
        </span>
        <ul
          style={{}}
          className="invisible absolute left-5 top-[44px] flex max-h-[150px] w-[450px] flex-wrap gap-3 overflow-y-auto overscroll-contain rounded-md bg-slate-100 p-3 opacity-0 group-hover:visible group-hover:opacity-100 "
        >
          {allCat.length ? (
            <>
              {allCat.map((category) => (
                <Link
                  to="c"
                  smooth={true}
                  duration={300}
                  spy={true}
                  // offset={100}
                  key={category}
                  onClick={() => handleFilterByCategory('filter', category)}
                  className="hover:underline"
                >
                  {category}
                </Link>
              ))}
            </>
          ) : null}
        </ul>
      </li>

      <li className="group relative flex h-full cursor-pointer items-center transition-transform duration-300 hover:translate-y-[-2px]">
        BRANDS{' '}
        <span className="transition-transform  duration-300 group-hover:rotate-180">
          <RiArrowDropDownLine size={19} />
        </span>
        <ul className="invisible absolute left-2 top-[44px] flex w-[450px] flex-wrap gap-3 rounded-md bg-slate-100 p-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
        </ul>
      </li>

      <Link
        onClick={() => handleFilterByCategory('deals', 'with-discount')}
        to="c"
        smooth={true}
        duration={SCROLL_DURATION}
      >
        <li className="group flex h-full cursor-pointer items-center transition-transform duration-300 hover:translate-y-[-2px]">
          DEALS{' '}
        </li>
      </Link>
      <li className="group flex h-full cursor-pointer items-center transition-transform duration-300 hover:translate-y-[-2px]">
        DELIVERY
      </li>
    </ul>
  )
}

export default NavLinks
