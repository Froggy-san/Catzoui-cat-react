import { z } from 'zod'
import { validateEgyptianPhoneNumber } from './helper'

export const updateUserSchema = z
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

export const addProductSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'The name is too short' })
      .max(300, { message: 'The name is too Long' }),
    category: z
      .string()
      .min(2, { message: 'Category has to be more than 2 char' })
      .max(50, { message: 'too Long' }),
    description: z.string().max(2200, { message: 'max 2200 char' }),
    price_per_unit: z
      .string()
      .min(2, { message: 'Price must not be less than 2 digits' }),
    stock: z
      .string()
      .min(1, { message: 'Stock amount must be atleast 1 unit' }),
    size: z.string().max(50, { message: 'Size is too long' }),
    color: z
      .string()
      .max(50, { message: 'What kind of color that has more than 50 char??' }),
    discount_amount: z.string(),
    average_rating: z.string().max(5),
    brand: z.string().max(50, { message: 'Brand name is too long' }),
    images: z.custom<File[]>(),
  })
  .refine(
    (data) => {
      return Number(data.price_per_unit) > Number(data.discount_amount)
    },
    {
      message: 'Price per unit must be greater than the discount amount',
      path: ['discount_amount'],
    }
  )
  .refine(
    (data) => {
      return data.images.length > 0 && data.images.length <= 5
    },
    {
      message:
        'Every product must have atleast 1 image and no more than 5 images!!, please upload an image',
      path: ['images'],
    }
  )
