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

import FormRow from '@/components/shared/FormRow'
import { updateUserSchema } from '@/utils/formSchema'
import { useRef } from 'react'
import _ from 'lodash'

const UpdateAccount = () => {
  const { user } = useUser()
  const { updateUserData, isUpdating } = useUpdateUser()
  //   const navigate = useNavigate();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
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

  // the default values, we get these values so we don't enable the user to sumbit the form without changing any data.
  const prevValues = useRef(form.getValues())

  // this is a function which checks if there has been any changes to the form or not.
  const hasChanges = () => {
    const currentValues = form.getValues()
    return !_.isEqual(currentValues, prevValues.current) // Use lodash for deep comparison
  }
  // console.log(prevValues, 'prevValues')
  function onSubmit(formData: z.infer<typeof updateUserSchema>) {
    try {
      // if there hasn't been changes , return.
      if (!hasChanges()) return

      // update user
      updateUserData({
        username: formData.username,
        phone: formData.phone,
        city: formData.city,
        street: formData.street,
        building_num: formData.building_num,
        imageToRemove: user?.user_metadata.avater.split('avatar/')[1],
        avatar: !formData.avatar.length ? '' : formData.avatar,
      })
    } finally {
      // here we are restting the value of the an object within a ref object , so we are not restting the ref it self, you can't do so anyways if you even tried to, the form.getValues here inside the form will return the values it self, unlike the from.getValues() we called inside the ref which returns an object that has the current object which has the current value, if you are finding it hard to understand what is written here, console.log(prevValues) and console.log(form.getValues).
      prevValues.current = form.getValues()
    }
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
