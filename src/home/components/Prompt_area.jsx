import '../var.css'
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPromptById } from "../../store/promptsSlice"
import PromptActions from './PromptActions'

const PROMPT_TYPE_BADGE = {
  text_prompt: {
    label: "Text Prompt",
    class: "badge-info"
  },
  image_prompt: {
    label: "Image Prompt",
    class: "badge-secondary"
  },
  music_prompt: {
    label: "Music Prompt",
    class: "badge-success"
  },
  video_prompt: {
    label: "Video Prompt",
    class: "badge-warning"
  }
}

export default function Prompt_area() {
  const { id } = useParams()
  const dispatch = useDispatch()

  /* ================= REFS ================= */
  const editorRef = useRef(null)
  const rawTextRef = useRef("")
  const initializedRef = useRef(false)

  /* ================= REDUX ================= */
  const prompt = useSelector(state => state.prompts.byId[id])

  /* ================= STATE ================= */
  const [meta, setMeta] = useState(null)
  const [variables, setVariables] = useState({})

  /* ================= ESCAPE HTML ================= */
  const escapeHtml = (text) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

  /* ================= RENDER ================= */
  const renderText = (text) => {
  if (!editorRef.current) return

  // 1️⃣ Convert literal "\n" → real newline
  const normalized = text.replace(/\\n/g, "\n")

  // 2️⃣ Escape HTML
  const escaped = escapeHtml(normalized)

  // 3️⃣ Convert newline → <br>
  const withBreaks = escaped.replace(/\n/g, "<br>")

  // 4️⃣ Highlight variables
  const highlighted = withBreaks.replace(
    /&lt;&lt;([\s\S]*?)&gt;&gt;/g,
    `<span class="var">&lt;&lt;$1&gt;&gt;</span>`
  )

  editorRef.current.innerHTML = highlighted
}



  /* ================= EXTRACT VARIABLES ================= */
  const extractVariables = (text) => {
    const matches = [...text.matchAll(/<<([\s\S]*?)>>/g)]

    const next = {}
    matches.forEach((m, i) => {
      next[`var_${i}`] = {
        label: m[1],
        value: m[1]
      }
    })

    setVariables(next)
  }

  /* ================= UPDATE VARIABLE ================= */
  const updateVariable = (id, value) => {
    setVariables(prev => {
      const updated = {
        ...prev,
        [id]: { ...prev[id], value }
      }

      let i = 0
      const updatedText = rawTextRef.current.replace(
        /<<([\s\S]*?)>>/g,
        () => `<<${updated[`var_${i++}`].value}>>`
      )

      rawTextRef.current = updatedText
      renderText(updatedText)

      return updated
    })
  }

  /* ================= FETCH PROMPT ================= */
  useEffect(() => {
    if (!prompt) {
      dispatch(fetchPromptById(id))
    }
  }, [id, prompt, dispatch])

  /* ================= INIT EDITOR (ONCE) ================= */
  useEffect(() => {
    if (!prompt || initializedRef.current) return

    initializedRef.current = true

    setMeta({
      title: prompt.title,
      description: prompt.description
    })

    const content = prompt.content || ""

    rawTextRef.current = content
    extractVariables(content)
    renderText(content)

  }, [prompt])

  /* ================= EDITOR INPUT ================= */
  const handleEditorInput = () => {
    const text = editorRef.current.innerText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")

    rawTextRef.current = text
    extractVariables(text)
    renderText(text)
  }

  /* ================= SEND ================= */
  const sendToAI = () => {
    const url = `https://perplexity.ai/?q=${encodeURIComponent(
      rawTextRef.current
    )}`
    window.open(url, "_blank")
  }

  /* ================= COPY & OPEN ================= */
  const copyAndOpen = async (platform) => {
    try {
      await navigator.clipboard.writeText(rawTextRef.current)

      const urls = {
        chatgpt: "https://chatgpt.com/",
        gemini: "https://gemini.google.com/app",
        grok: "https://grok.x.com/",
        claude: "https://claude.ai/new",
        midjourney: "https://www.midjourney.com/",
        dalle: "https://openai.com/index/dall-e-3/",
        suno: "https://suno.ai/"
      }

      const url = urls[platform]
      if (!url) return

      window.open(url, "_blank")
    } catch (err) {
      console.error(err)
      alert("Failed to copy prompt")
    }
  }

  /* ================= LOADING ================= */
  if (!prompt) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-md" />
      </div>
    )
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">

      {/* TITLE + BADGE */}
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-xl font-semibold">
          {meta?.title}
        </h2>

        {prompt?.layout_key && (
          <span
            className={`badge ${PROMPT_TYPE_BADGE[prompt.layout_key]?.class || "badge-ghost"}`}
          >
            {PROMPT_TYPE_BADGE[prompt.layout_key]?.label || "Prompt"}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500">
        {meta?.description}
      </p>

      {/* EDITOR */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleEditorInput}
        spellCheck={false}
        className="
          min-h-35
          p-4
          border
          rounded-md
          font-mono
          whitespace-pre-wrap
          leading-8
          w-full
          max-w-5xl
          focus:ring-1
        "
      />

      {/* VARIABLES */}
      <div className="space-y-3">
        {Object.entries(variables).map(([id, obj]) => (
          <div key={id}>
            <label className="text-sm font-medium">
              {obj.label}
            </label>
            <textarea
              className="w-full p-2 border rounded-md font-mono"
              rows={2}
              value={obj.value}
              onChange={(e) => updateVariable(id, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mb-20">
        <PromptActions
          promptType={prompt.layout_key}
          sendToAI={sendToAI}
          copyAndOpen={copyAndOpen}
        />
      </div>

    </div>
  )
}
