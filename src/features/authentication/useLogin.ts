import { login } from '@/services/apiAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function useLogin() {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { isPending: isLogingIn, mutate: loginUser } = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)

      navigate('/', { replace: true })
    },

    onError: (err) => {
      toast(err.message)
    },
  })
  return { loginUser, isLogingIn }
}
