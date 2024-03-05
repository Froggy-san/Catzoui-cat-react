import { Button } from '../ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RxCross1 } from 'react-icons/rx'
import OprationButtonTypes from './OprationButtonTypes'
import { useCallback } from 'react'

// * FilterOperation component is a component, an array of options, it's gonna look like this options = {[{label:all,value:all},{label:clothing,value:clothing}]}, base on every option we are ganna make a button with the label value . and it receives filterFiled where we are going to filter the results based on it's value  so it can be  based on("clothing","electronics",you get the gist...),  and then we set it's value to the one of the options.
interface Option {
  value?: string
  label?: string | JSX.Element
}

type FilterProps = {
  className?: string
  filterFiled: string
  options?: Option[]
}

const FitlerOperations = ({ className, filterFiled, options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // we are checking if the filterFiled === becasue we want to preselect the first option when the page load.
  const currentFilter =
    filterFiled === 'filter'
      ? searchParams.get(filterFiled) || options?.at(0)?.value
      : searchParams.get(filterFiled) || ''

  console.log(currentFilter)

  // check if the filed === filter or not becasue the filter option can be toggled on but not off when clicked on them again. as to the other options they can be toggled on and off.
  function handleClick(value: string) {
    if (filterFiled !== 'filter' && currentFilter === value) {
      deleteParam()
    } else {
      // set the page to 1 agian, becasue the filtered products might not have more than 1 page to be displayed on.
      if (searchParams.get('page')) {
        searchParams.set('page', '1')
      }

      // if the currentFilter doesn't exist nor equals the same value, set the filterFiled to the buttons value, agian it's going to look like this, searhParams.set(category,"clothing")
      searchParams.set(filterFiled, value)
      setSearchParams(searchParams)
    }
  }

  const deleteParam = useCallback(() => {
    // Create a new URLSearchParams object without the product parameter
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(filterFiled)

    // Navigate to the same pathname with the new search string
    navigate({ search: newParams.toString() })
  }, [searchParams, navigate, filterFiled])

  return (
    <div className={className}>
      {filterFiled === 'filter' && <OprationButtonTypes type="filter" />}

      {filterFiled === 'sortBy' && <OprationButtonTypes type="sort" />}
      {options?.map((option) => (
        <Button
          key={option.value}
          size="sm"
          onClick={() => {
            handleClick(option.value || '')
          }}
          disabled={
            filterFiled === 'filter' ? currentFilter === option.value : false
          }
          className={`${
            currentFilter === option.value &&
            'border border-slate-950 bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }  h-7 gap-1 rounded-lg text-xs font-normal leading-5  tracking-wide disabled:border   disabled:border-slate-950 disabled:bg-secondary disabled:font-semibold disabled:text-secondary-foreground disabled:hover:bg-secondary/80 sm:h-9 sm:px-2 sm:py-1  sm:text-[14px] `}
        >
          {option.label}
          <span
            className={`${
              currentFilter !== option.value && 'rotate-45'
            } transition-transform duration-300`}
          >
            <RxCross1 size={11} />
          </span>
        </Button>
      ))}
    </div>
  )
}

export default FitlerOperations
