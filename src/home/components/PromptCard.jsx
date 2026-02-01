import { useNavigate } from "react-router-dom"

import {
  FaPenNib,
  FaImage,
  FaMusic,
  FaVideo
} from "react-icons/fa"

const PROMPT_TYPE_MAP = {
  text_prompt: {
    label: "Text",
    icon: FaPenNib,
    bg: "bg-base-200",
    hoverBg: "hover:bg-base-300",
    badge: "badge-info"
  },
  image_prompt: {
    label: "Image",
    icon: FaImage,
    bg: "bg-purple-500/5",
    hoverBg: "hover:bg-purple-500/15",
    badge: "badge-secondary"
  },
  music_prompt: {
    label: "Music",
    icon: FaMusic,
    bg: "bg-green-500/5",
    hoverBg: "hover:bg-green-500/15",
    badge: "badge-success"
  },
  video_prompt: {
    label: "Video",
    icon: FaVideo,
    bg: "bg-orange-500/5",
    hoverBg: "hover:bg-orange-500/15",
    badge: "badge-warning"
  }
}


export default function PromptCard({ prompt }) {


  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/prompt/${prompt.id}`, {
      state: { prompt } // optional, for instant render
    })
  }

  const type =
    PROMPT_TYPE_MAP[prompt.layout_key] || PROMPT_TYPE_MAP.text_prompt

  const Icon = type.icon

  return (
    <div
      onClick={handleClick}
      className={`card ${type.bg} ${type.hoverBg}
        border border-base-300
        transition-all duration-300 ease-out
        w-60 h-64 cursor-pointer`}
    >
      <div className="card-body p-4 flex flex-col justify-between">

        {/* Top */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div
              className={`badge badge-sm ${type.badge} flex items-center gap-1`}
            >
              <Icon size={12} />
              {type.label}
            </div>

            <span className="text-xs opacity-60">
              {prompt.popularity_score}
            </span>
          </div>

          <h2 className="text-sm font-semibold leading-snug line-clamp-2">
            {prompt.title}
          </h2>

          <p className="text-xs opacity-75 line-clamp-3">
            {prompt.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex justify-end pt-2">
          <button className="btn btn-xs btn-ghost">
            View
          </button>
        </div>
      </div>
    </div>
  )
}

