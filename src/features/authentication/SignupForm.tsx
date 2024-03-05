'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Avatar from './Avatar'
import { useNavigate } from 'react-router-dom'
import useSignUp from './useSignup'
import { validateEgyptianPhoneNumber } from '@/utils/helper'
import VerifyAccount from './VerifyAccount'
import { useState } from 'react'

const formSchema = z
  .object({
    email: z
      .string()
      .min(10, { message: 'Email must be atleast 10 character(s)' })
      .max(55, { message: 'Email must be less than 55 character(s)' }),
    password: z
      .string()
      .min(8, { message: 'Password must be atleast 8 character(s)' })
      .max(33, { message: 'Password must be less than 33 character(s)' }),
    confirmPassword: z.string().min(8).max(33),
    username: z
      .string()
      .min(2, { message: 'Too short' })
      .max(50, { message: 'Too long' }),
    city: z
      .string()
      .min(4, { message: 'Too short' })
      .max(100, { message: 'Too long' }),
    street: z
      .string()
      .min(4, { message: 'Too short' })
      .max(100, { message: 'Too long' }),
    building_num: z.string().min(1, { message: 'Must be 1 or more' }),
    phone: z
      .string()
      .min(11, { message: 'Phone number must be 11 character(s)' })
      .max(11),
    avatar: z.custom<File[]>(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: "Passwords don't match. Make sure you typed the right password.",
      path: ['confirmPassword'],
    }
  )
  .refine(
    (data) => {
      return validateEgyptianPhoneNumber(data.phone)
    },
    {
      message: `Phone number must match the patterns of Egyptian phone numbers`,
      path: ['phone'],
    }
  )

const SignupForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const [email, setEmail] = useState('')

  const { isSigningUp, signUpUser } = useSignUp()
  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      city: '',
      street: '',
      building_num: '',
      phone: '',
      avatar: [],
    },
  })

  function onSubmit({
    email,
    password,
    username,
    phone,
    city,
    street,
    building_num,
    avatar,
  }: z.infer<typeof formSchema>) {
    signUpUser(
      {
        email,
        password,
        username,
        phone,
        city,
        street,
        building_num,
        avatar,
      },
      {
        onSuccess: () => {
          // navigate("/sign-in");
          setEmail(email)
          setDialogOpen(true)
        },

        onSettled: () => {
          form.reset()
        },
      }
    )
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSigningUp}
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSigningUp}
                    type="email"
                    placeholder="Email"
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
                    disabled={isSigningUp}
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
                    disabled={isSigningUp}
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input disabled={isSigningUp} placeholder="city" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSigningUp}
                    placeholder="Street"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="building_num"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building Number</FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    disabled={isSigningUp}
                    type="number"
                    placeholder="2"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSigningUp}
                    placeholder="011-294-424-76"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile image</FormLabel>
                <FormControl>
                  <Avatar fieldChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              disabled={isSigningUp}
              variant="secondary"
              onClick={() => {
                navigate('/sign-in', { replace: true })
              }}
            >
              Sign in
            </Button>
            <Button disabled={isSigningUp} type="submit">
              Sign up
            </Button>
          </div>
        </form>
      </Form>
      <VerifyAccount
        email={email}
        setIsOpen={setDialogOpen}
        isOpen={dialogOpen}
      />
    </div>
  )
}

export default SignupForm
