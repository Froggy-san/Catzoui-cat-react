'use client'
import { useUser } from './useUser'
import useUpdateUser from './useUpdateUser'
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
import Avatar from './Avatar'
import { validateEgyptianPhoneNumber } from '@/utils/helper'
import FormRow from '@/components/shared/FormRow'

const formSchema = z
  .object({
    email: z.string().min(10).max(55),
    username: z.string().min(2).max(50),
    city: z.string().min(4),
    street: z.string().min(5).max(55),
    building_num: z.string().min(1),
    phone: z.string().min(11).max(11),
    avatar: z.custom<File[]>(),
  })
  .refine(
    (data) => {
      return validateEgyptianPhoneNumber(data.phone)
    },
    {
      message: `Phone number must match the patterns of Egyptian phone numbers`,
      path: ['phone'],
    }
  )

const UpdateAccount = () => {
  const { user } = useUser()
  const { updateUserData, isUpdating } = useUpdateUser()
  //   const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || '',
      //   password: "",
      //   confirmPassword: "",
      username: user?.user_metadata.username || '',
      city: user?.user_metadata.city || '',
      street: user?.user_metadata.street || '',
      building_num: user?.user_metadata.building_num || '',
      phone: user?.user_metadata.phone || '',
      avatar: user?.user_metadata.avatar || [],
    },
  })

  function onSubmit({
    email,
    // password,
    username,
    phone,
    city,
    street,
    building_num,
    avatar,
  }: z.infer<typeof formSchema>) {
    console.log(
      email,
      //   password,
      username,
      phone,
      city,
      street,
      building_num,
      avatar,
      'updated here ?1 ??!!!!'
    )

    updateUserData({
      username,
      phone,
      city,
      street,
      building_num,
      imageToRemove: user?.user_metadata.avater.split('avatar/')[1],
      avatar: !avatar.length ? '' : avatar,
    })
  }

  return (
    <div className=" rounded-2xl border px-5 py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormRow>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      placeholder="username"
                      {...field}
                    />
                  </FormControl>

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
                      disabled
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </FormRow>

          <FormRow>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      placeholder="city"
                      {...field}
                    />
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
                      disabled={isUpdating}
                      placeholder="Street"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </FormRow>

          <FormRow>
            <FormField
              control={form.control}
              name="building_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      type="number"
                      min={1}
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
                      disabled={isUpdating}
                      placeholder="011-294-424-76"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </FormRow>

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile image</FormLabel>
                <FormControl>
                  <Avatar
                    mediaUrl={user?.user_metadata.avater}
                    fieldChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end space-x-3">
            <Button
              disabled={isUpdating}
              type="button"
              variant="secondary"
              onClick={() => {
                form.reset()
              }}
            >
              Cancel
            </Button>
            <Button disabled={isUpdating} type="submit">
              Commit changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateAccount
