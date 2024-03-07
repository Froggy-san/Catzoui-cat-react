import supabase, { supabaseUrl } from './supabase'
import { PAGE_SIZE } from '@/utils/constants'
export async function getProducts({
  filterValue,
  filterRange,
  deals,
  sortBy,
  page,
}: {
  filterValue: string
  filterRange: string
  sortBy: string
  deals: string
  page: number
}) {
  /// 1. select everything from the Products table and select (id,product_id,image_url) from  another table that is related by a forgin key called ProductImages. aslo we are getting the count of the total products in the database.
  let query = supabase
    .from('Products')
    .select('* , ProductImages(id, product_id, image_url)', { count: 'exact' })

  //Filter

  /*2. add the .eq to the query variable, so it will look like this (supabase
     .from("Products")
     .select("* , ProductImages(id, product_id, image_url)", { count: "exact" })).eq() 
     that is us telling to to get the data where a conditon is met.
     
     */

  // ! here the codetion is where the category culomn of the product === filterValue
  if (filterValue && filterValue !== 'all')
    query = query.eq('category', filterValue)

  // if (brand) query = query.eq("brand", brand);
  // if (filterValue === "electronics")
  //   query = query.eq("category", "electronics");
  // * here the codetion is where the discount culomn of the product > 0, so we get all the products that has a discount.
  if (deals) query = query.gt('discount_amount', '0')

  // if (filterValue === "with-discount") query = query.gt("discount_amount", "0");
  // * here we are filtering the products by price range we are getting a variable called filterRange that looks like this 200-600, like from: EGP200 ~ EGP600. gte = greater than or equal , lte = less than or equal. so we split the filterRange value from the ("-") and then get the values, and then we are telling it in what order we want it , in that case we are sorting it ascenddingly.
  if (filterRange && filterRange !== 'no-range') {
    const range = filterRange.split(',')

    query = query
      .gte('price_per_unit', range.at(0))
      .lte('price_per_unit', range.at(1))
      .order('price_per_unit', { ascending: true })
  }

  // Sorting
  if (sortBy !== 'no-sort') {
    const sorting = sortBy.split('-')

    query = query.order(sorting[0], {
      ascending: sorting.at(1) === 'asc',
    })
  }

  // pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE // (1-1) * 10 = 0

    const to = from + PAGE_SIZE - 1 // 0 + 10 - 1 = 9

    query = query.range(from, to)
  }
  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error(`Booking couldn't be loaded`)
  }

  return { data, count }
}

// export async function getProducts() {
//   const { data, error } = await supabase
//     .from("Products")
//     .select("* , ProductImages(id, product_id, image_url)");

//   if (error) {
//     // Handle error appropriately (e.g., throw with more information)
//     throw new Error(`Error fetching products: ${error.message}`);
//   }

//   return data;
// }

interface ProductProps {
  name: string
  brand: string
  color: string
  description: string
  discount_amount: number
  price_per_unit: number
  size: string
  stock: number
  category: string
  average_rating: number
}

export async function createProduct({
  newProduct,
  images,
}: {
  newProduct: ProductProps
  images: File[]
}) {
  //https://danikyifviurhveealoe.supabase.co

  ///UPLOADING AND ASSIGNING IMAGES TO PRODUCTS.

  // * this is how an image url from supabase database storage , the storage is called catzoui,  and what come after catzoui/ is the image name from the file we set to this function, the url from supabase will  look like: https://danikyifviurhveealoe.supabase.co/storage/v1/object/public/catzoui/4._360_convertible_design.png?t=2024-02-07T20%3A06%3A32.440Z

  // *1. we are changing the images name becasue we need it to be unique other wise we could be having mutliple images with the same name, so we added (Math.random-TheNameOfTheImage) and we are replacing all (/\) with nothing.
  const imageNames = images.map((image) =>
    `${Math.random()}-${image.name}`.replace(/\//g, '')
  )

  // 2.  Add the name of the image to the supabase link, like we mentioned above.
  const imagePaths = imageNames.map(
    (name) => `${supabaseUrl}/storage/v1/object/public/catzoui/${name}`
  )

  /// 3. before we upload the images we need to create the product it self first uplaod the product.
  const { data, error: productError } = await supabase
    .from('Products')
    .insert([{ ...newProduct }])
    .select()

  if (productError) throw productError

  // 4.  now that we have the image paths/urls we can upload it to the ProductImages table along side the reladted product to it as showen below.
  imagePaths.forEach(async (path) => {
    const { error: imageError } = await supabase
      .from('ProductImages')
      .insert([{ product_id: data[0].id, image_url: path }])
      .select()

    if (imageError) throw new Error(`Had Trouble uploading the images`)
  })

  // 5. upload the files to the storage.
  images.forEach(async (imageFile, i) => {
    const { error } = await supabase.storage
      .from('catzoui')
      .upload(imageNames[i], imageFile)
    if (error) throw new Error(`Truble uploading files`)
  })

  return data
}

export async function updateProduct({
  updatedProduct,
  images,
  id,
  imagesToRemove,
}: {
  updatedProduct: ProductProps
  images?: File[] | string
  id: string
  imagesToRemove?: (string | undefined)[] | undefined
}) {
  // the images we receive from the function can be either an array of files or a string, if it is a string that means the user didn't change the images of the product therefore we don't need to upload any images.

  // 1. rename images
  let imageNames: string[] | undefined | string

  if (typeof images !== 'string') {
    imageNames = images?.map((image) =>
      `${Math.random()}-${image.name}`.replace(/\//g, '')
    )
  } else {
    imageNames = ''
  }

  // 2. add the supabase storage link to the image name.

  let imagePaths

  if (typeof imageNames !== 'string') {
    imagePaths = imageNames?.map(
      (name) => `${supabaseUrl}/storage/v1/object/public/catzoui/${name}`
    )
  } else {
    imagePaths = ''
  }

  // 3. update product/

  const { data, error } = await supabase
    .from('Products')
    .update({ ...updatedProduct })
    .eq('id', id)
    .select()

  if (error) {
    console.error(error)
    throw error
  }

  // if imagesName === string, that is us saying if there is no images to upload, so return the data.
  if (typeof imageNames === 'string') return data

  //  we are checking if imagePaths is an array here becasue if it is it means that we received
  if (Array.isArray(imagePaths)) {
    // 4. delete any existing image Links related to this product from the ProductImages Table.
    const { error: deleteImageFromTableError } = await supabase
      .from('ProductImages')
      .delete()
      .eq('product_id', id)

    if (deleteImageFromTableError)
      throw new Error(`Had truble deleting images from table`)

    // 5. upload related image links to the ProductImages table.
    imagePaths?.forEach(async (path) => {
      const { error: imageError } = await supabase
        .from('ProductImages')
        .insert([{ product_id: data[0].id, image_url: path }])
        .select()

      if (imageError) throw new Error(`Truble uploading the images`)
    })
  }

  // 6. upload image files to the storage and removing the past images files related to the updated product.

  if (Array.isArray(images) && imageNames) {
    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i]
      const { error } = await supabase.storage
        .from('catzoui')
        .upload(imageNames[i], imageFile)
      if (error) throw new Error(`had truble uploading the updated images`)

      // Delete images files related to product.
      if (!error && imagesToRemove) {
        const { error: deleteStorageImageError } = await supabase.storage
          .from('catzoui')
          .remove([...(imagesToRemove as string[])])
        if (deleteStorageImageError)
          throw new Error(`had truble deleting images from storage!`)
      }
    }
  }

  return data
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('Products')
    .select('* , ProductImages(id, product_id, image_url)')
    .eq('id', id)

  if (error) throw new Error(`Couldn't find a product with that ID #${id}`)

  return data
}

export async function getProductByCategory(category: string, id: string) {
  // if (!category || category === "") return [productObj];

  const { data, error } = await supabase
    .from('Products')
    .select('* , ProductImages( image_url)')
    .eq('category', category)
    .neq('id', id)
    .range(0, 30)

  if (error)
    throw new Error(
      `Couldn't find a product with that category name #${category}`
    )

  return data
}

export async function getAllCategories() {
  const { data, error } = await supabase.from('Products').select('category')

  if (error) console.error(`had truble fetching  categories`)

  return data
}

export async function getAllBrands() {
  const { data, error } = await supabase.from('Products').select('brand')

  if (error) console.error(`had truble fetching all brands`)

  return data
}

export async function getWishList(list: number[] | []) {
  if (!list.length) return []

  // const wishList = list.map(async (item) => {
  //   const { data, error } = await supabase
  //     .from("Products")
  //     .select("id , name , category , ProductImages(image_url)")
  //     .eq("id", item);

  //   if (error) throw new Error(`error from wishlist`);

  //   return data;
  // });

  const wishList = await Promise.all(
    list.map(async (item) => {
      const { data, error } = await supabase
        .from('Products')
        .select('id , name , category , ProductImages(image_url)')
        .eq('id', item)

      if (error) throw new Error(`error from wishlist`)

      return data.at(0)
    })
  )

  return wishList
}

export async function getSearchResults(searchTerm: string) {
  const { data, error } = await supabase
    .from('Products')
    .select('id , name , category , ProductImages(image_url)')
    .or(
      `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
    )
  // .ilike("searchTerm", `%${searchTerm}%`);

  if (error) throw new Error(`Had truble getting the search results`)

  return data
}
export async function deleteProdcut(id: string) {
  const { error: deleteImageError } = await supabase
    .from('ProductImages')
    .delete()
    .eq('product_id', id)

  const { error } = await supabase.from('Products').delete().eq('id', id)

  if (error || deleteImageError)
    throw new Error(
      `Had truble deleting product/images ${error || deleteImageError}`
    )

  return deleteImageError
}

export async function deleteProdcutImages(images: (string | undefined)[]) {
  const { error: deleteStorageImageError } = await supabase.storage
    .from('catzoui')
    .remove([...(images as string[])])
  if (deleteStorageImageError)
    throw new Error(`had truble deleting images from storage!`)

  return deleteStorageImageError
}
