import { configureStore } from '@reduxjs/toolkit'

import wishListReducer from '../features/wishList/wishListSlice'

import cartReducer from '../features/cart/cartSlice'

const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    cart: cartReducer,
  },
})

export default store
