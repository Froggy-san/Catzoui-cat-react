import { ProdcutImage, RootState } from '@/Types/type'
import { createSlice } from '@reduxjs/toolkit'

interface cartItem {
  ProductImages: ProdcutImage[] | null
  itemId: string
  average_rating?: number | null
  brand?: number | null // add a question mark to make it optional
  category: string | null
  color: string | null
  created_at: string | null
  description: string | null
  discount_amount: number
  id: number
  name: string | null
  price_per_unit: number
  size: string | null
  stock: number | null
  quantity: number
  totalPriceAfterDiscount: number
  totalPriceWithoutDiscount: number
}

const initialState: { cart: cartItem[] } = {
  cart: JSON.parse(sessionStorage.getItem('cart') || '[]'),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // 1. check if the same items with the same properties exist in the cart.

      const sameProduct = state.cart.some(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      )
      // 2. if so find it.
      const sameItem = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      )

      // const diffItem = state.cart.find(
      //   (item) =>
      //     (item.id === action.payload.id &&
      //       item.color !== action.payload.color) ||
      //     item.size !== action.payload.size
      // );

      // const notTheSameProduct = state.cart.some(
      //   (item) =>
      //     (item.id === action.payload.id &&
      //       item.color !== action.payload.color) ||
      //     item.size !== action.payload.size
      // );
      // 3. set a unique id so we can find that varient of the product later on just so the user could delete or increase/decrease it's quantity  form the cart, and then add increase the quantity of the the product by the amount requested.
      if (sameProduct && sameItem) {
        sameItem.itemId = crypto.randomUUID()
        sameItem.quantity = sameItem.quantity + action.payload.quantity

        //
        sameItem.totalPriceWithoutDiscount =
          sameItem.quantity * sameItem.price_per_unit

        // total price. 3 * 22 - 5 = 66
        sameItem.totalPriceAfterDiscount =
          (sameItem.price_per_unit - sameItem.discount_amount) *
          sameItem.quantity
      } else {
        // 4. Else if the product doesn't exist already in the cart just add it. that way if the user adds it again the above will apply.
        state.cart.push(action.payload)
      }
    },
    // here we are deleting the prodcut with the itemId, becasue every product can be bought with different color/size
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload)
    },

    deleteAllRelatedItems(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload)
      // console.log([...state.cart], "cart from the slice <<");
      console.log(item, 'item from slice <<<<')
      if (item && item.stock) {
        if (item.quantity === item.stock) return
        item.quantity++

        //
        item.totalPriceWithoutDiscount = item.quantity * item.price_per_unit

        // total price. 3 * 22 - 5 = 66
        item.totalPriceAfterDiscount =
          (item.price_per_unit - item.discount_amount) * item.quantity
      }
    },

    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload)
      console.log(item, '<<<<<<<<< item here >>>>>>>')
      if (item && item.stock) {
        if (item.quantity === 0) return
        item.quantity--

        //
        item.totalPriceWithoutDiscount = item.quantity * item.price_per_unit

        // total price. 3 * 22 - 5 = 66
        item.totalPriceAfterDiscount =
          (item.price_per_unit - item.discount_amount) * item.quantity

        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action)
      }
    },
    addColor(state, action) {
      const item = state.cart.find(
        (item) => item.itemId === action.payload.itemId
      )
      if (item) item.color = action.payload.color
    },
    addSize(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload.id)
      if (item) item.size = action.payload.size
    },

    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addItem,
  deleteItem,
  deleteAllRelatedItems,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addColor,
  addSize,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state: RootState) => state.cart.cart

export const getTotalItemQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, curEl) => sum + curEl.quantity, 0)

export const getTotalBeforeDiscount = (state: RootState) =>
  state.cart.cart.reduce(
    (sum, curEl) => sum + curEl.totalPriceWithoutDiscount,
    0
  )

export const getTotalAfterDiscount = (state: RootState) =>
  state.cart.cart.reduce((sum, curEl) => sum + curEl.totalPriceAfterDiscount, 0)
console.log(getCart, 'getCart here ??>      >>>')
