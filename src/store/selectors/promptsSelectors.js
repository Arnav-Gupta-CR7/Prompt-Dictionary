import { createSelector } from "@reduxjs/toolkit"

const selectById = state => state.prompts.byId
const selectTrendingIds = state => state.prompts.trendingIds

export const selectTrendingPrompts = createSelector(
  [selectTrendingIds, selectById],
  (ids, byId) => ids.map(id => byId[id]).filter(Boolean)
)
