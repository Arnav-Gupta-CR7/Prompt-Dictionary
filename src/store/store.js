import { configureStore } from "@reduxjs/toolkit"
import promptsReducer from "./promptsSlice"
import categoryPromptsReducer from "./categoryPromptsSlice"

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
    categoryPrompts: categoryPromptsReducer
  }
})
