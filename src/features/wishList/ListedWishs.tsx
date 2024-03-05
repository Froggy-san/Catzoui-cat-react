import { useSelector } from 'react-redux'
import useGetWished from './useGetWished'
import useSetItemFromStorage from '@/hooks/useSetItemFromStorage'
import { RootState } from '@/Types/type'

import WishLoading from './WishLoading'
import Empty from '@/components/shared/Empty'
import WishedItem from './WishedItem'
import GoBackButton from '@/components/shared/GoBackButton'

const ListedWishs = () => {
  const { wishList } = useSelector((state: RootState) => state.wishList)
  const { isLoading, wishedItems, error } = useGetWished(wishList)

  useSetItemFromStorage('wishList', wishList)

  if (!isLoading && !error && !wishedItems?.length)
    return (
      <div className="flex flex-col items-center justify-center gap-2 ">
        <Empty message="There are not items in the wish list...." />{' '}
        <GoBackButton />
      </div>
    )

  if (error) return <p>Something went wrong while fetching your wishlist...</p>

  return (
    <ul className="product-list grid gap-4 px-0 xs:px-7  sm:px-0 ">
      {isLoading && <WishLoading />}

      {wishedItems &&
        wishedItems.map((item) => {
          if (!item) return
          return <WishedItem wishedItem={item} key={item?.id} />
        })}
    </ul>
  )
}

export default ListedWishs
