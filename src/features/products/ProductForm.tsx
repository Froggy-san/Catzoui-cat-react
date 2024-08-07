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
import { IoBagAdd } from 'react-icons/io5'
import { Textarea } from '@/components/ui/textarea'
import FileUploader from '@/components/shared/FileUploader'
import { useCreateProduct } from './useCreateProduct'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import useScrollIntoView from '@/hooks/useScrollIntoView'
import { formatText, removeAllSpacesFrom } from '@/utils/helper'
import FormRow from '@/components/shared/FormRow'
import { Product } from '@/Types/type'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useUpdateProduct from './useUpdateProdcut'
import { CiEdit } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllRelatedItems, getCart } from '@/features/cart/cartSlice'
import { useEffect, useState } from 'react'
import { addProductSchema } from '@/utils/formSchema'
import Tags from './Tags'

const ProductForm = ({ product, id }: { id?: string; product?: Product }) => {
  const [isColorsVisible, setIsColorsVisible] = useState(false)
  const [isSizeVisible, setIsSizeVisible] = useState(false)
  const { isCreating, createNewProduct } = useCreateProduct()
  const { update, isUpdating } = useUpdateProduct()
  const cart = useSelector(getCart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useScrollIntoView()
  const images = product?.ProductImages?.map((image) => image.image_url) // get the images for the product you want to update so the user can see what the images look like and if he wants to change it.

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)) // when updating the products we want to delete the products from the cart, becasue it will not update with the updated data. so we are resetting the cart everytime we do so.
  }, [cart])

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || '',
      description: product?.description || '',
      price_per_unit: product?.price_per_unit.toString() || '',
      stock: product?.stock.toString() || '',
      size: product?.size || '',
      color: product?.color || '',
      discount_amount: product?.discount_amount.toString() || '',
      average_rating: product?.average_rating?.toString() || '',
      brand: product?.brand?.toString() || '',
      images: [],
    },
  })

  // 2. Define a submit handler.
  function onSubmit({
    name,
    brand,
    color,
    description,
    discount_amount,
    price_per_unit,
    size,
    stock,
    category,
    average_rating,
    images,
  }: z.infer<typeof addProductSchema>) {
    if (product) {
      const updatedProduct = {
        name,
        brand: formatText(brand),
        color: removeAllSpacesFrom(color, false),
        description,
        discount_amount: +discount_amount,
        price_per_unit: +price_per_unit,
        size: removeAllSpacesFrom(size, true),
        stock: +stock,
        category: formatText(category),
        average_rating: +average_rating,
      }

      const imagesToRemove = product?.ProductImages?.map(
        (imageObj) => imageObj.image_url?.split('catzoui/')[1]
      )

      const isString = typeof images[0] === 'string'
      update(
        {
          updatedProduct,
          images: isString ? '' : images,
          id: id || '',
          imagesToRemove,
        },
        {
          onSuccess: () => {
            toast('Prodcut has been updated successfully!')
            if (id) dispatch(deleteAllRelatedItems(+id))

            navigate(-1)
          },
          onError: () => {
            toast('not updated')
          },
        }
      )
    }

    if (!product) {
      const newProduct = {
        name,
        brand: formatText(brand),
        color: removeAllSpacesFrom(color, false),
        description,
        discount_amount: +discount_amount,
        price_per_unit: +price_per_unit,
        size: removeAllSpacesFrom(size, true),
        stock: +stock,
        category: formatText(category),
        average_rating: +average_rating,
      }

      createNewProduct(
        { newProduct, images },
        {
          onSuccess: () => {
            toast('Product added successfuly!', {
              description: (
                <div className="flex items-center space-x-2">
                  <span>
                    <IoBagAdd size={15} />
                  </span>
                  <span>Prodcut added to the list</span>
                </div>
              ),

              closeButton: true,
            })
          },
        }
      )
    }
  }

  return (
    <div ref={ref} className=" h-fit px-1 sm:px-5">
      <div className=" mx-auto mt-24 min-w-[99%]  max-w-5xl  sm:min-w-[500px] ">
        {product ? (
          <h1 className="my-10 flex items-center justify-center gap-2 text-xl font-semibold tracking-wider sm:text-3xl">
            Edit product <CiEdit size={30} />
          </h1>
        ) : (
          <h1 className="my-10 flex items-center justify-center gap-2 text-xl font-semibold tracking-wider sm:text-3xl">
            Create a new Product <IoBagAdd size={30} />
          </h1>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  rounded-3xl  border px-4 py-6 sm:px-9 sm:py-7"
          >
            <FormRow>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isCreating || isUpdating}
                        placeholder="name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-semibold text-green-500">
                      Put your product's name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isCreating || isUpdating}
                        placeholder="fashion"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-semibold text-green-500">
                      Put your category's name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                control={form.control}
                name="price_per_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per unit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isCreating || isUpdating}
                        placeholder="$11"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-semibold text-green-500">
                      Unit price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isCreating || isUpdating}
                        type="number"
                        min={0}
                        placeholder="$10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-semibold text-green-500">
                      Discount per unit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <>
                    {isSizeVisible ? (
                      <FormItem>
                        <FormLabel>Product size</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onBlur={() => {
                              setIsSizeVisible(false)
                            }}
                            autoFocus
                            type="text"
                            disabled={isCreating || isUpdating}
                            placeholder="m,xl,120cm,"
                          />
                        </FormControl>
                        <FormDescription className="font-semibold text-green-500">
                          Put what size is the product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    ) : (
                      <div className=" space-y-2">
                        <FormLabel>Product size</FormLabel>
                        <Tags
                          fieldType="size"
                          showField={setIsSizeVisible}
                          fieldChange={field.onChange}
                          tags={form.getValues().size}
                        />
                        <FormDescription className="font-semibold text-green-500">
                          Put what size is the product.
                        </FormDescription>
                      </div>
                    )}
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <>
                    {isColorsVisible ? (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoFocus
                            onBlur={() => {
                              setIsColorsVisible(false)
                            }}
                            type="text"
                            disabled={isCreating || isUpdating}
                            placeholder="red,green,#ffff,blue"
                          />
                        </FormControl>
                        <FormDescription className="font-semibold text-green-500">
                          Colors available in this product
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    ) : (
                      <div className=" space-y-2">
                        <FormLabel>Color</FormLabel>
                        <Tags
                          fieldType="colors"
                          showField={setIsColorsVisible}
                          fieldChange={field.onChange}
                          tags={form.getValues().color}
                        />
                        <FormDescription className="font-semibold text-green-500">
                          Colors available in this product
                        </FormDescription>
                      </div>
                    )}
                  </>
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount in stock</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isCreating || isUpdating}
                        type="number"
                        min={0}
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="font-semibold text-green-500">
                      Amount available in stock.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="average_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isCreating || isUpdating}
                        min={0}
                        max={5}
                        type="number"
                        placeholder="3"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-semibold text-green-500">
                      inital rating.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isCreating || isUpdating}
                      placeholder="Nike"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isCreating || isUpdating}
                      placeholder="Talk about the prodcut"
                      {...field}
                      className="h-[350px]"
                    />
                  </FormControl>
                  <FormDescription className="font-semibold text-green-500">
                    Product description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      disabled={isCreating || isUpdating}
                      mediaUrl={images}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-2">
              <Button disabled={isCreating || isUpdating} type="submit">
                {product ? 'Commit changes' : 'Submit'}
              </Button>
              <Button
                disabled={isCreating || isUpdating}
                type="reset"
                onClick={() => {
                  form.reset()
                  if (product) navigate(`/?product=${id}`)
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProductForm
