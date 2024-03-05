import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Avatar } from '../ui/avatar'
import { Link } from 'react-router-dom'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import NavMenuItem from './NavMenuItem'
import UilityButton from './UilityButton'
import Searching, { useSearchBarContext } from './Searching'
import NavLinks from './NavLinks'
import Logo from './Logo'
import Bar from './Bar'
import BarBorder from './BarBorder'
import { useUser } from '@/features/authentication/useUser'
import { CiLogout } from 'react-icons/ci'
import useLogout from '@/features/authentication/useLogout'
import { CiHeart, CiShoppingBasket } from 'react-icons/ci'
import { RxPerson } from 'react-icons/rx'
import { PiDotsThreeVertical } from 'react-icons/pi'

const Header = () => {
  const { close } = useSearchBarContext()
  // const { close: menuClose } = useMenuItemContext();
  const { user } = useUser()
  const { logoutUser } = useLogout()
  return (
    <nav className="container relative flex h-11 items-center justify-between px-2">
      <Bar>
        <Bar.BarButton />
        <Bar.NavSlider />
      </Bar>

      <NavLinks />

      <Logo />

      <ul
        className="z-50 flex h-full
        items-center text-[1.4rem] xs:space-x-1 sm:space-x-2"
      >
        <Searching.Toggle />

        <NavMenuItem>
          <NavMenuItem.UtilButtonComp>
            <UilityButton visible="screen" render={() => <RxPerson />} />
          </NavMenuItem.UtilButtonComp>

          <NavMenuItem.MenuComp className="absolute right-20  top-[45px] hidden w-[200px] flex-col gap-1  rounded-md  border bg-[#ffffff] p-2 text-sm md:flex">
            {' '}
            <Link
              to="/account"
              className="relative  flex justify-around gap-2 rounded-md px-2 py-1 hover:bg-slate-100/70"
            >
              {/* <FaCheckCircle
                className="absolute right-[-5px] top-[2px] text-green-600 opacity-80"
                size={15}
              /> */}
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage
                  src={user?.user_metadata.avater}
                  className="h-full w-full rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col truncate">
                <h1>
                  <strong>{user?.user_metadata.username}</strong>
                </h1>
                <p className="text-sm ">{user?.email}</p>
              </div>
            </Link>
            <div
              className="flex cursor-pointer   items-center  gap-3 rounded-md px-2 py-1 hover:bg-slate-100/70"
              onClick={() => logoutUser()}
            >
              <CiLogout size={30} />{' '}
              <span className=" text-md truncate pb-1">
                Log out <strong>{user?.email}</strong>
              </span>{' '}
            </div>
          </NavMenuItem.MenuComp>
        </NavMenuItem>

        <UilityButton
          type="link"
          to="wishlist"
          visible="screen"
          render={() => <CiHeart />}
        />

        <UilityButton
          type="link"
          to="cart"
          name="cart"
          render={() => <CiShoppingBasket />}
        />

        <NavMenuItem>
          <NavMenuItem.UtilButtonComp>
            <UilityButton
              visible="mobile"
              render={() => <PiDotsThreeVertical />}
            />
          </NavMenuItem.UtilButtonComp>

          <NavMenuItem.MenuComp className="absolute right-5 top-10 flex flex-col  rounded-md bg-slate-200 p-1 text-sm md:hidden">
            {' '}
            <div className="flex cursor-pointer items-center gap-1  rounded-md px-2 py-1 hover:bg-slate-100">
              <RxPerson size={17} /> <Link to="/account">Account</Link>
            </div>
            <div className="flex cursor-pointer items-center  gap-1 rounded-md px-2 py-1 hover:bg-slate-100">
              <CiHeart size={17} /> <Link to="/wishlist">Wish list</Link>
            </div>
          </NavMenuItem.MenuComp>
        </NavMenuItem>
      </ul>

      <ClickAwayListener onClickAway={close}>
        <Searching.SearchBar />
      </ClickAwayListener>

      <BarBorder />
    </nav>
  )
}

export default Header
