import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTrendingPrompts } from "../../store/promptsSlice"
import PromptCard from "./PromptCard"
import Skeleton from "../Skeleton"

export default function TrendingPrompts() {
  const dispatch = useDispatch()

  const trendingIds = useSelector(state => state.prompts.trendingIds)
  const status = useSelector(state => state.prompts.trendingStatus)

  const prompts = useSelector(state =>
    trendingIds.map(id => state.prompts.byId[id]).filter(Boolean)
  )

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTrendingPrompts())
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <Skeleton/>
  }

  if (status === "failed") {
    return <p>Failed to load trending prompts</p>
  }

  return (
    <div className=" mt-12 grid grid-cols-[repeat(auto-fill,240px)] gap-4 justify-center">
      {prompts.map(p => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  )
}
