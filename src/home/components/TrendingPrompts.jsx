import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTrendingPrompts } from "../../store/promptsSlice"
import PromptCard from "./PromptCard"

export default function TrendingPrompts() {
  const dispatch = useDispatch()
  const { trending, status } = useSelector(state => state.prompts)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTrendingPrompts())
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <span className="loading loading-spinner" />
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-4 justify-center">
      {trending.map(p => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  )
}
