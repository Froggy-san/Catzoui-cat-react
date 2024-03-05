import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import GoBackButton from '@/components/shared/GoBackButton'

const EmptyCart = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-6 ">
      <div className="flex items-center justify-center gap-6">
        <h1 className="text-xl">There are no items in the cart.</h1>
        <MdOutlineRemoveShoppingCart size={20} />
        <GoBackButton />
      </div>
    </div>
  )
}

export default EmptyCart
