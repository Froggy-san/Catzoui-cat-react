import { signup } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSignUp() {
  const {
    data: signUpData,
    isPending: isSigningUp,
    mutate: signUpUser,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast(`Account has been created successfully`);
    },
    onError: (err) => {
      toast(err.message + "!");
    },
  });

  return { isSigningUp, signUpUser, signUpData };
}
