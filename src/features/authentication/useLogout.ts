import { logout } from '@/services/apiAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logoutUser, isPending: isLogingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });
      queryClient.removeQueries()
      navigate('/sign-in', { replace: true })
    },
  })

  return { logoutUser, isLogingOut }
}
