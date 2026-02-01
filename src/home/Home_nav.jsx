import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Thankyou_note from "./experiment/Thankyou_note";
import Sidebar_items from "./Sidebar_items";
import { supabase } from "../lib/supabase";

export default function Home_nav() {
  const [isForest, setIsForest] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isForest ? "forest" : "cupcake",
    );
  }, [isForest]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      const { data, error } = await supabase.rpc("autocomplete_search", {
        q: query,
      });

      if (!error) setSuggestions(data || []);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-6">
      {/* LEFT: Drawer */}

      <div className="flex-none">
        <div className="drawer">
          <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-1" className="btn drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>{" "}
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-1"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <Sidebar_items />
            </ul>
          </div>
        </div>
      </div>

      <div className=" hidden md:flex mx-5 ">
        <Link to={"/"} className="hidden md:block text-xl">
          PromptDictionary.in
        </Link>
        <span className="text-xs">β</span>
      </div>

      {/* CENTER: Search (shrinks on phone) */}
      <div className="relative ml-4 flex-1 min-w-32 sm:min-w-48 md:min-w-104">
        <label className="input input-bordered input-sm flex items-center gap-2 w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm"
          />
        </label>

        {/* AUTOCOMPLETE */}
        {suggestions.length > 0 && (
          <ul
            className="
      absolute z-50 mt-2
      left-0
      w-[82vw] sm:w-full
      bg-base-100 border border-base-300
      rounded-xl shadow-lg
      max-h-[60vh] sm:max-h-64
      overflow-y-auto
    "
          >
            {suggestions.map((item) => (
              <li
                key={item.entity_id}
                className="
          px-4 py-3
          flex justify-between items-center gap-3
          hover:bg-base-200 cursor-pointer
        "
                onClick={() => {
                  setSuggestions([]);
                  setQuery("");
                  item.entity_type === "category"
                    ? navigate(`/category/${item.category_slug}`)
                    : navigate(`/prompt/${item.entity_id}`);
                }}
              >
                {/* Title */}
                <span className="text-xs sm:text-sm truncate max-w-[70%] leading-relaxed">
                  {item.title}
                </span>

                {/* Badge */}
                <span
                  className={`
            badge badge-xs sm:badge-sm
            ${
              item.entity_type === "category"
                ? "badge-secondary"
                : "badge-primary"
            }
          `}
                >
                  {item.subtitle}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT: Actions */}
      <div className="w-full flex justify-end">
        <div className="flex-none flex items-center gap-x-3 sm:gap-6">
          {/* hide thank you on very small screens */}
          <div className="md:block">
            <Thankyou_note />
          </div>

          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={isForest}
              onChange={() => setIsForest(!isForest)}
            />

            <svg
              className="swap-on h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* Avatar */}
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-7 rounded-full">
              <span className="text-[10px]">UI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
