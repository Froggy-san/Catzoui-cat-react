export interface cartItem {
  ProductImages: ProdcutImage[]
  average_rating?: number
  brand?: number // add a question mark to make it optional
  category: string
  color: string
  created_at: string
  description: string
  discount_amount: number
  id: number
  itemId: string
  name: string
  price_per_unit: number
  size: string
  stock: number
  quantity: number
  totalPriceAfterDiscount: number
  totalPriceWithoutDiscount: number
}

export interface RootState {
  wishList: {
    wishList: number[] // Assuming wishList holds an array of numbers
    rating: { id: number; rating: number }[]
  }

  cart: {
    cart: cartItem[]
  }
}

export interface ProdcutImage {
  id: number
  image_url: string | null
  product_id: number | null // change this to number
}
export interface Product {
  ProductImages: ProdcutImage[]
  average_rating?: number
  brand: string // add a question mark to make it optional
  category: string
  color: string
  created_at: string
  description: string
  discount_amount: number
  id: number
  name: string
  price_per_unit: number
  size: string
  stock: number
}
