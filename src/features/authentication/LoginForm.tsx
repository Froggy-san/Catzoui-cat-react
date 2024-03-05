'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import useLogin from './useLogin'

const formSchema = z.object({
  email: z.string().min(6).max(50),
  password: z.string().min(8).max(22),
})

const LoginForm = () => {
  const navigate = useNavigate()

  const { isLogingIn, loginUser } = useLogin()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    loginUser({ email, password })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLogingIn}
                  placeholder="Username@asdasd.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isLogingIn}
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end space-x-3">
          <Button
            type="button"
            disabled={isLogingIn}
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              navigate('/sign-up')
            }}
          >
            Sign up
          </Button>
          <Button disabled={isLogingIn} type="submit">
            Log in
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
