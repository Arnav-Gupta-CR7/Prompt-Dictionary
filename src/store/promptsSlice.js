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
    trending: [],
    byId: {},
    status: "idle" // idle | loading | succeeded | failed
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingPrompts.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchTrendingPrompts.fulfilled, (state, action) => {
        state.trending = action.payload
        state.status = "succeeded"

        // cache by id also
        action.payload.forEach(p => {
          state.byId[p.id] = p
        })
      })
      .addCase(fetchPromptById.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload
      })
  }
})

export default promptsSlice.reducer
