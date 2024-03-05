import { useUser } from '../authentication/useUser'
import { TiHeartFullOutline } from 'react-icons/ti'

const WishHeader = () => {
  const { user } = useUser()
  return (
    <div className="my-24 flex items-center justify-center gap-3 text-2xl font-semibold">
      <span>{user?.user_metadata.username + "'s"} Wish list</span>{' '}
      <TiHeartFullOutline size={30} />{' '}
    </div>
  )
}

export default WishHeader
