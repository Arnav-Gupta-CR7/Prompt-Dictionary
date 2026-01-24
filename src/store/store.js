import { configureStore } from "@reduxjs/toolkit"
import promptsReducer from "./promptsSlice"

export const store = configureStore({
  reducer: {
    prompts: promptsReducer
  }
})
