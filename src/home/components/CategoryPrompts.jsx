import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { fetchCategoryPromptsBySlug } from "../../store/categoryPromptsSlice"
import Cat_PromptCard from "./Cat_PromptCard"
import Skeleton from "../Skeleton"

export default function CategoryPrompts() {
  const { cat_slug } = useParams()
  const dispatch = useDispatch()

  const promptIds = useSelector(
    state => state.categoryPrompts.promptIdsBySlug[cat_slug]
  )

  const status = useSelector(
    state => state.categoryPrompts.statusBySlug[cat_slug]
  )

  const prompts = useSelector(state =>
    promptIds?.map(id => state.prompts.byId[id]).filter(Boolean)
  )

  useEffect(() => {
    if (!cat_slug) return

    if (!status || status === "idle") {
      dispatch(fetchCategoryPromptsBySlug(cat_slug))
    }
  }, [cat_slug, status, dispatch])

  if (status === "loading") {
    return <Skeleton/>
  }

  if (status === "failed") {
    return <p>Failed to load category</p>
  }

  if (!prompts || prompts.length === 0) return (
    <>
    <div className="flex justify-center h-50 items-center">
      <span className="skeleton skeleton-text text-2xl">sorry no promts available at the moment.....</span>
      <button className="btn btn-dash btn-xs ml-6"><Link to="/"> <span className="flex items-center gap-x-2">Home<FaHouse /></span></Link></button>
    </div>
      
    </>
  ) 

  return (
    <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-4 justify-center">
      {prompts.map(p => (
        <Cat_PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  )
}
