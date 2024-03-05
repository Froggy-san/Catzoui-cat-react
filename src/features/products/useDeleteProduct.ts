import { deleteProdcut } from '@/services/apiProducts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useDeleteProduct() {
  const queryClient = useQueryClient()

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProdcut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (err) => toast(`${err.message}`),
  })
  return { deleteProduct, isDeleting }
}
