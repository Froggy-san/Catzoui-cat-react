import React, { forwardRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '../ui/button'
import { PAGE_SIZE } from '@/utils/constants'
import { Link } from 'react-scroll'

const Pagination = forwardRef(function Pagination(
  {
    count,
  }: {
    count: number | null | undefined
    handleIntoView?: () => void
  },
  ref?: React.Ref<HTMLDivElement>
) {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  const pageCount = count && Math.ceil(count / PAGE_SIZE)

  //   useEffect(() => {
  //     handleIntoView();
  //   }, [searchParams]);
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1

    searchParams.set('page', String(next))
    setSearchParams(searchParams)
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1
    searchParams.set('page', String(prev))
    setSearchParams(searchParams)
  }

  if ((pageCount && pageCount <= 1) || count === 0) return null

  return (
    <div ref={ref} className="mt-6 flex items-center justify-between ">
      <Link
        to="c"
        smooth={true}
        duration={300}
        spy={true}
        // offset={100}
      >
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          prev
        </Button>
      </Link>
      <span>{currentPage}</span>
      <Link
        to="c"
        smooth={true}
        duration={300}
        spy={true}
        // offset={100}
      >
        <Button
          variant="secondary"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          next
        </Button>
      </Link>
    </div>
  )
})

export default Pagination
