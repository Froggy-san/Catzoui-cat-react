import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  wishList: number[]
  rating: { id: number; rating: number }[]
} = {
  wishList: JSON.parse(localStorage.getItem('wishList') || '[]'),
  rating: JSON.parse(localStorage.getItem('rating') || '[]'),
}
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addItemToWishList(state, action) {
      state.wishList = [...state.wishList, action.payload]
    },

    deleteFromWishList(state, action) {
      state.wishList = state.wishList.filter((id) => id !== action.payload)
    },

    addRating(state, action) {
      if (state.rating.some((el) => el.id === action.payload.id)) {
        state.rating = state.rating.filter((el) => el.id !== action.payload.id)
        state.rating = [...state.rating, action.payload]
      } else state.rating = [...state.rating, action.payload]
    },
  },
})

export const { addItemToWishList, deleteFromWishList, addRating } =
  wishListSlice.actions

export default wishListSlice.reducer
