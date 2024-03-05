import { CiBoxList } from 'react-icons/ci'
import { GiHollowCat } from 'react-icons/gi'

import { CiDiscount1 } from 'react-icons/ci'
import { CiDeliveryTruck, CiLogin } from 'react-icons/ci'

import NavLinkSubMenuItem from './NavLinkSubMenuItem'
import NavItem from './NavItem'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'

import { Link, useNavigate } from 'react-router-dom'

import { forwardRef, useMemo } from 'react'
import { useUser } from '@/features/authentication/useUser'
import useLogout from '@/features/authentication/useLogout'
import useCategories from '@/features/products/useGetAllCategories'

const Slider = forwardRef(function NavLinkSlider(
  {
    isOpen,
    close,
  }: {
    isOpen: boolean
    close: () => void
  },
  // Accept a ref as the second argument after props
  ref: React.Ref<HTMLDivElement>
) {
  const { user } = useUser()
  const { allCategories } = useCategories()

  const { isLogingOut, logoutUser } = useLogout()
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const allCat = useMemo(() => {
    return [...new Set(allCategories?.map((pro) => pro.category))]
  }, [allCategories])

  function handleFilterByCategory(value: string) {
    // searchParams.set("filter", value);
    // setSearchParams(searchParams);
    navigate(`/?filter=${value}`)
  }
  // console.log(user?.user_metadata, "user here !!");
  return (
    // Add the ref attribute to the div element that wraps the NavLinksSlider component
    <div
      ref={ref}
      className={`NavOpen duration-400 fixed bottom-0  top-1/2 z-[60] flex h-[85dvh]  w-[170px] translate-y-[-50%] flex-col justify-between rounded-r-2xl bg-slate-200 py-3 shadow-2xl transition-all lg:left-[-170px] ${
        isOpen ? 'left-0' : 'invisible left-[-170px] opacity-0 '
      }`}
    >
      <ul className="flex flex-col  py-2  ">
        <NavItem render={() => <CiBoxList size={20} />} categoryName="CATEGORY">
          {allCat?.length &&
            allCat?.map((cat) => (
              <NavLinkSubMenuItem
                onClick={() => {
                  handleFilterByCategory(cat)
                  close()
                }}
                text={cat}
                key={cat}
              />
            ))}

          {/* <NavLinkSubMenuItem text="ELECTRONICS" />

          <NavLinkSubMenuItem text="CLOTHING" />

          <NavLinkSubMenuItem text="MIDICINE" />

          <NavLinkSubMenuItem text="BUTEY PRODUCTS" />

          <NavLinkSubMenuItem text="SOMETHING ELSE" /> */}
        </NavItem>

        <NavItem render={() => <GiHollowCat size={20} />} categoryName="BRANDS">
          <NavLinkSubMenuItem text="NIKE" />

          <NavLinkSubMenuItem text="BOSCH" />

          <NavLinkSubMenuItem text="LENOVO" />

          <NavLinkSubMenuItem text="HP" />

          <NavLinkSubMenuItem text="SOMETHING ELSE" />
        </NavItem>

        <NavItem render={() => <CiDiscount1 size={20} />} categoryName="DEALS">
          <NavLinkSubMenuItem text="LAPTOPS 4" />
          <NavLinkSubMenuItem text="CLOTHING 76" />
          <NavLinkSubMenuItem text="MAKEUP 23" />
          <NavLinkSubMenuItem text="WHATEVER 11" />
          <NavLinkSubMenuItem text="LAPTOPS 4" />
        </NavItem>

        <NavItem
          render={() => <CiDeliveryTruck size={20} />}
          categoryName="DELIVERY"
        />
      </ul>
      <div
        className="mx-1 flex  justify-between rounded-lg border border-slate-800 bg-slate-100 px-2 py-3
        "
      >
        <Link
          to="/account"
          className="flex gap-2
          "
          onClick={() => close()}
        >
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage
              src={user?.user_metadata.avater}
              className="h-full w-full rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p className="w-[70px] truncate text-sm">{user?.email}</p>
            <p className="truncate text-xs text-teal-500">
              {user?.user_metadata.username}
            </p>
          </div>
        </Link>
        <Button
          disabled={isLogingOut}
          onClick={() => logoutUser()}
          className="mt-auto h-6 w-6 bg-slate-900 hover:bg-slate-800"
          size="icon"
        >
          <CiLogin size={15} />
        </Button>
      </div>
    </div>
  )
})

export default Slider
