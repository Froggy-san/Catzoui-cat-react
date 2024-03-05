import { deleteProdcutImages } from "@/services/apiProducts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteFromStorage() {
  const { mutate: deleteStorage } = useMutation({
    mutationFn: deleteProdcutImages,

    onSuccess: () => toast("deleted images from storage"),
  });

  return { deleteStorage };
}
