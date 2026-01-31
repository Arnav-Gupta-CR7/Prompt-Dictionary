import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCategoryPromptsBySlug } from "../../store/categoryPromptsSlice"
import Cat_PromptCard from "./Cat_PromptCard"

export default function CategoryPrompts() {
  const { cat_slug } = useParams()
  const dispatch = useDispatch()

  const prompts = useSelector(
    state => state.categoryPrompts.promptsBySlug[cat_slug]
  )
  console.log(prompts)
  const status = useSelector(
    state => state.categoryPrompts.statusBySlug[cat_slug]
  )

  useEffect(() => {
    if (!cat_slug) return

    if (!status || status === "idle") {
      dispatch(fetchCategoryPromptsBySlug(cat_slug))
    }
  }, [cat_slug, status, dispatch])

  if (status === "loading") {
    return <span className="loading loading-spinner" />
  }

  if (status === "failed") {
    return <p>Failed to load category</p>
  }

  if (!prompts) return null

  return (
    <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-4 justify-center">
      {prompts.map(p => (
        <Cat_PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  )
}
