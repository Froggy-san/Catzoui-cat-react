import { updateUser } from '@/services/apiAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useUpdateUser() {
  const queryClient = useQueryClient()

  const {
    mutate: updateUserData,
    isPending: isUpdating,
    data: updatedData,
  } = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })

      toast(`User has been updated`)
    },

    onError: (err) => {
      toast(`Had truble updating the user's data, ${err.message}`)
    },
  })

  return { isUpdating, updatedData, updateUserData }
}
