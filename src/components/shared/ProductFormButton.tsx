import { useUser } from '@/features/authentication/useUser'

import { Button } from '../ui/button'
import { IoAdd } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const ProductFormButton = () => {
  const { user } = useUser()

  return (
    <div>
      {user?.user_metadata.privileges ? (
        <Link to="/add-product" className="mx-auto block w-[97%]  md:w-[700px]">
          <Button variant="outline" className="   w-full gap-1">
            Add a product <IoAdd size={20} />{' '}
          </Button>
        </Link>
      ) : null}
    </div>
  )
}

export default ProductFormButton
