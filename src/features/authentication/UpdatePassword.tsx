"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useUpdateUser from "./useUpdateUser";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Too short" })
      .max(33, { message: "Too long" }),

    confirmPassword: z
      .string()
      .min(8, { message: "Too short" })
      .max(33, { message: "Too long" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match. Make sure you typed the right password.",
      path: ["confirmPassword"],
    }
  );

const UpdatePassword = () => {
  const { updateUserData, isUpdating } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit({ password }: z.infer<typeof formSchema>) {
    updateUserData({ password });

    form.reset();
  }

  return (
    <div className="px-5 py-6 rounded-2xl border mb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdating}
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdating}
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-3 justify-end">
            <Button
              onClick={() => form.reset()}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePassword;
