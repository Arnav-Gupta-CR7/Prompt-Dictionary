import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../lib/supabase"

const MAX_CATEGORIES = 5

export const fetchCategoryPromptsBySlug = createAsyncThunk(
  "categoryPrompts/fetchBySlug",
  async (cat_slug, { rejectWithValue }) => {
    const { data, error } = await supabase.rpc(
      "get_prompts_by_category",
      { cat_slug } // ✅ MATCHES SQL PARAM NAME
    )

    if (error) {
      console.error("RPC ERROR:", error)
      return rejectWithValue(error.message)
    }

    return {
      slug: cat_slug,
      prompts: data
    }
  }
)


const categoryPromptsSlice = createSlice({
  name: "categoryPrompts",
  initialState: {
    promptsBySlug: {},
    statusBySlug: {},
    slugOrder: [], // LRU → MRU
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryPromptsBySlug.pending, (state, action) => {
        state.statusBySlug[action.meta.arg] = "loading"
      })

      .addCase(fetchCategoryPromptsBySlug.fulfilled, (state, action) => {
        const { slug, prompts } = action.payload

        // save data
        state.promptsBySlug[slug] = prompts
        state.statusBySlug[slug] = "succeeded"

        // update LRU order
        state.slugOrder = state.slugOrder.filter(s => s !== slug)
        state.slugOrder.push(slug)

        // evict oldest
        if (state.slugOrder.length > MAX_CATEGORIES) {
          const oldest = state.slugOrder.shift()
          delete state.promptsBySlug[oldest]
          delete state.statusBySlug[oldest]
        }
      })

      .addCase(fetchCategoryPromptsBySlug.rejected, (state, action) => {
        state.statusBySlug[action.meta.arg] = "failed"
        state.error = action.payload
      })
  }
})

export default categoryPromptsSlice.reducer
