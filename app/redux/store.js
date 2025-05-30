import { configureStore } from '@reduxjs/toolkit'
import cardsSlice from './cards/cardsslice'
import passwordsSlice from './passwords/passwordslice'

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    passwords: passwordsSlice,
  },
})