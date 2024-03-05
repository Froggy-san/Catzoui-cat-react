import { createProduct } from '@/services/apiProducts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  const { mutate: createNewProduct, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (err) => toast(`${err.message}`),
  })

  return { createNewProduct, isCreating }
}
