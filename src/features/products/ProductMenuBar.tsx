import { useUser } from '../authentication/useUser'
import { Link } from 'react-router-dom'
import NavMenuItem from '@/components/shared/NavMenuItem'
import UilityButton from '@/components/shared/UilityButton'

import { CiHeart } from 'react-icons/ci'
import { PiDotsThreeVertical } from 'react-icons/pi'

import { IoAdd } from 'react-icons/io5'

const ProductMenuBar = () => {
  const { user } = useUser()
  return (
    <div className="relative flex items-center justify-end">
      <NavMenuItem>
        <NavMenuItem.UtilButtonComp>
          <UilityButton render={() => <PiDotsThreeVertical />} />
        </NavMenuItem.UtilButtonComp>

        <NavMenuItem.MenuComp className="absolute right-1 top-8 flex flex-col  rounded-md bg-slate-200 p-1 text-sm">
          {' '}
          {user?.user_metadata.privileges ? (
            <Link
              to="/add-product"
              className="flex cursor-pointer items-center gap-1  rounded-md px-2 py-1 hover:bg-slate-100"
            >
              <IoAdd size={17} /> <span>Add Product</span>
            </Link>
          ) : null}
          <Link
            to="/wishlist"
            className="flex cursor-pointer items-center  gap-1 rounded-md px-2 py-1 hover:bg-slate-100"
          >
            <CiHeart size={17} /> <span>Wish list</span>
          </Link>
        </NavMenuItem.MenuComp>
      </NavMenuItem>
    </div>
  )
}

export default ProductMenuBar
