import { CiShoppingCart } from 'react-icons/ci'
import { useUser } from '../authentication/useUser'

const CartHeader = () => {
  const { user } = useUser()

  return (
    <h1 className=" my-7 flex items-center justify-center gap-3 text-xl font-semibold tracking-wider sm:text-3xl">
      {user?.user_metadata.username + "'s"} Cart{' '}
      <span>
        <CiShoppingCart size={30} />
      </span>
    </h1>
  )
}

export default CartHeader
