import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { fetchCategoryPromptsBySlug } from "../../store/categoryPromptsSlice";
import Cat_PromptCard from "./Cat_PromptCard";
import Skeleton from "../Skeleton";

export default function CategoryPrompts() {
  const { cat_slug } = useParams();
  const dispatch = useDispatch();

  const promptIds = useSelector(
    (state) => state.categoryPrompts.promptIdsBySlug[cat_slug],
  );

  const status = useSelector(
    (state) => state.categoryPrompts.statusBySlug[cat_slug],
  );

  const prompts = useSelector((state) =>
    promptIds?.map((id) => state.prompts.byId[id]).filter(Boolean),
  );

  useEffect(() => {
    if (!cat_slug) return;

    if (!status || status === "idle") {
      dispatch(fetchCategoryPromptsBySlug(cat_slug));
    }
  }, [cat_slug, status, dispatch]);

  if (status === "loading") {
    return <Skeleton />;
  }

  if (status === "failed") {
    return <p>Failed to load category</p>;
  }

  if (!prompts || prompts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center gap-4">
        {/* MESSAGE */}
        <span className="skeleton skeleton-text text-sm sm:text-base md:text-lg max-w-md">
          Sorry, no prompts are available at the moment.
        </span>

        {/* ACTION */}
        <Link to="/">
          <button className="btn btn-outline btn-sm flex items-center gap-2">
            <FaHouse className="text-sm" />
            Home
          </button>
        </Link>
      </div>
    );

  return (
    <div className="mt-12 grid grid-cols-[repeat(auto-fill,240px)] gap-4 justify-center">
      {prompts.map((p) => (
        <Cat_PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}
