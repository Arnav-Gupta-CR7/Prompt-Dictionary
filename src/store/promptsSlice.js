import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../lib/supabase"


/* ---------- Thunks ---------- */

export const fetchTrendingPrompts = createAsyncThunk(
  "prompts/fetchTrending",
  async () => {
    const { data, error } = await supabase.rpc("get_trending_prompts")
    if (error) throw error
    return data
  }
)

export const fetchPromptById = createAsyncThunk(
  "prompts/fetchById",
  async (id) => {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }
)

/* ---------- Slice ---------- */

const promptsSlice = createSlice({
  name: "prompts",
  initialState: {
    byId: {},
    trendingIds: [],
    statusById: {},
    trendingStatus: "idle"
  },
  reducers: {
    addManyPrompts: (state, action) => {
      action.payload.forEach(prompt => {
        state.byId[prompt.id] = prompt
        state.statusById[prompt.id] = "succeeded"
      })
    }
  },
  extraReducers: builder => {
    builder
      /* ---------- Trending ---------- */
      .addCase(fetchTrendingPrompts.pending, state => {
        state.trendingStatus = "loading"
      })
      .addCase(fetchTrendingPrompts.fulfilled, (state, action) => {
        state.trendingStatus = "succeeded"

        state.trendingIds = action.payload.map(p => p.id)

        action.payload.forEach(p => {
          state.byId[p.id] = p
          state.statusById[p.id] = "succeeded"
        })
      })
      .addCase(fetchTrendingPrompts.rejected, state => {
        state.trendingStatus = "failed"
      })

      /* ---------- By ID ---------- */
      .addCase(fetchPromptById.pending, (state, action) => {
        state.statusById[action.meta.arg] = "loading"
      })
      .addCase(fetchPromptById.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload
        state.statusById[action.payload.id] = "succeeded"
      })
      .addCase(fetchPromptById.rejected, (state, action) => {
        state.statusById[action.meta.arg] = "failed"
      })
  }
})

export const { addManyPrompts } = promptsSlice.actions
export default promptsSlice.reducer
