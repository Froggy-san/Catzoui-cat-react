import { IoReturnUpBack } from 'react-icons/io5'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const GoBackButton = () => {
  const navigate = useNavigate()
  return (
    <Button variant="ghost" onClick={() => navigate('/')} className="gap-3">
      Go back <IoReturnUpBack size={20} />
    </Button>
  )
}

export default GoBackButton
