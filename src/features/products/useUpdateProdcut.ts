import { updateProduct } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export default function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast(`${err.message}`);
      console.error(err.message);
    },
  });

  return { update, isUpdating };
}
