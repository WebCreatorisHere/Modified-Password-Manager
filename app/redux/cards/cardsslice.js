import { createSlice } from '@reduxjs/toolkit'
import { getcards } from '@/app/actions/actions/clerkaction'

const initialState = {
  value: [],
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addition: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload)
    },
    subtraction: (state,action) => {
      state.value = state.value.filter((card)=>card.cardId !== action.payload)
    },
    setcards:(state, action)=>{
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addition, subtraction ,setcards} = cardsSlice.actions

export default cardsSlice.reducer