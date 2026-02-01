import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../lib/supabase"
import { addManyPrompts } from "./promptsSlice"

const MAX_CATEGORIES = 5

/* ---------- Thunk ---------- */

export const fetchCategoryPromptsBySlug = createAsyncThunk(
  "categoryPrompts/fetchBySlug",
  async (cat_slug, { dispatch, rejectWithValue }) => {
    const { data, error } = await supabase.rpc(
      "get_prompts_by_category",
      { cat_slug }
    )

    if (error) {
      console.error("RPC ERROR:", error)
      return rejectWithValue(error.message)
    }

    // 🔥 Normalize into promptsSlice
    dispatch(addManyPrompts(data))

    return {
      slug: cat_slug,
      promptIds: data.map(p => p.id)
    }
  }
)

/* ---------- Slice ---------- */

const categoryPromptsSlice = createSlice({
  name: "categoryPrompts",
  initialState: {
    promptIdsBySlug: {},
    statusBySlug: {},
    slugOrder: [],
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryPromptsBySlug.pending, (state, action) => {
        state.statusBySlug[action.meta.arg] = "loading"
      })

      .addCase(fetchCategoryPromptsBySlug.fulfilled, (state, action) => {
        const { slug, promptIds } = action.payload

        state.promptIdsBySlug[slug] = promptIds
        state.statusBySlug[slug] = "succeeded"

        // LRU handling
        state.slugOrder = state.slugOrder.filter(s => s !== slug)
        state.slugOrder.push(slug)

        if (state.slugOrder.length > MAX_CATEGORIES) {
          const oldest = state.slugOrder.shift()
          delete state.promptIdsBySlug[oldest]
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
