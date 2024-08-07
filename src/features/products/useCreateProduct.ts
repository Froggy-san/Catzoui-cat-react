import { createProduct } from '@/services/apiProducts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: createNewProduct, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      navigate(-1)
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },

    onError: (err) => toast(`${err.message}`),
  })

  return { createNewProduct, isCreating }
}
