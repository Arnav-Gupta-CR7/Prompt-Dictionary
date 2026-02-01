import "../var.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromptById } from "../../store/promptsSlice";
import PromptActions from "./PromptActions";
import { FiCopy } from "react-icons/fi";
import Skeleton from "../Skeleton";

const PROMPT_TYPE_BADGE = {
  text_prompt: { label: "Text Prompt", class: "badge-info" },
  image_prompt: { label: "Image Prompt", class: "badge-secondary" },
  music_prompt: { label: "Music Prompt", class: "badge-success" },
  video_prompt: { label: "Video Prompt", class: "badge-warning" },
};

export default function Prompt_area() {
  const { id } = useParams();
  const dispatch = useDispatch();

  /* ================= REFS ================= */
  const editorRef = useRef(null);
  const rawTextRef = useRef("");

  /* ================= REDUX ================= */
  const prompt = useSelector((state) => state.prompts.byId[id]);
  const status = useSelector((state) => state.prompts.statusById[id]);

  /* ================= STATE ================= */
  const [variables, setVariables] = useState({});
  const [copied, setCopied] = useState(false);

  /* ================= FETCH PROMPT ================= */
  useEffect(() => {
    if (!id) return;

    if (!prompt && status !== "loading") {
      dispatch(fetchPromptById(id));
    }
  }, [id, prompt, status, dispatch]);

  /* ================= ESCAPE HTML ================= */
  const escapeHtml = (text) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ================= RENDER ================= */
  const renderText = (text) => {
    if (!editorRef.current) return;

    const normalized = text.replace(/\\n/g, "\n");
    const escaped = escapeHtml(normalized);
    const withBreaks = escaped.replace(/\n/g, "<br>");

    const highlighted = withBreaks.replace(
      /&lt;&lt;([\s\S]*?)&gt;&gt;/g,
      `<span class="var">&lt;&lt;$1&gt;&gt;</span>`,
    );

    editorRef.current.innerHTML = highlighted;
  };

  /* ================= EXTRACT VARIABLES ================= */
  const extractVariables = (text) => {
    const matches = [...text.matchAll(/<<([\s\S]*?)>>/g)];
    const next = {};

    matches.forEach((m, i) => {
      next[`var_${i}`] = {
        label: m[1],
        value: m[1],
      };
    });

    setVariables(next);
  };

  /* ================= INIT / RESET ON PROMPT CHANGE ================= */
  useEffect(() => {
    if (!prompt) return;

    const content = prompt.content || "";

    rawTextRef.current = content;
    extractVariables(content);
    renderText(content);
  }, [prompt]);

  /* ================= UPDATE VARIABLE ================= */
  const updateVariable = (id, value) => {
    setVariables((prev) => {
      const updated = {
        ...prev,
        [id]: { ...prev[id], value },
      };

      let i = 0;
      const updatedText = rawTextRef.current.replace(
        /<<([\s\S]*?)>>/g,
        () => `<<${updated[`var_${i++}`].value}>>`,
      );

      rawTextRef.current = updatedText;
      renderText(updatedText);

      return updated;
    });
  };

  /* ================= EDITOR INPUT ================= */
  const handleEditorInput = () => {
    const text = editorRef.current.innerText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n");

    rawTextRef.current = text;
    extractVariables(text);
    renderText(text);
  };

  /* ================= SEND ================= */
  const sendToAI = () => {
    const url = `https://perplexity.ai/?q=${encodeURIComponent(
      rawTextRef.current,
    )}`;
    window.open(url, "_blank");
  };

  /* ================= COPY & OPEN ================= */
  const copyAndOpen = async (platform) => {
    const text = rawTextRef.current;
    if (!text) return;

    const urls = {
      chatgpt: "https://chatgpt.com/",
      gemini: "https://gemini.google.com/app",
      grok: "https://grok.x.com/",
      claude: "https://claude.ai/new",
      midjourney: "https://www.midjourney.com/",
      dalle: "https://openai.com/index/dall-e-3/",
      suno: "https://suno.ai/",
    };

    try {
      // 1️⃣ COPY (with mobile fallback)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      // 2️⃣ OPEN immediately (still in user gesture)
      const url = urls[platform];
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("Copy & open failed:", err);
      alert("Tap and hold to copy manually");
    }
  };

  /* ================= LOADING ================= */
  if (!prompt) {
    return (
      <div className="flex justify-center mt-10">
        <Skeleton />
      </div>
    );
  }

  /* ================= COPY BUTTON ================= */
  const copyPrompt = async () => {
    const text = rawTextRef.current;
    if (!text) return;

    try {
      // Modern browsers (desktop + some mobile)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile (iOS Safari)
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Prevent scrolling on iOS
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Tap and hold to copy manually");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 space-y-6 md:space-y-7">
      {/* TITLE + BADGE */}
      <div className="flex items-start md:items-center gap-2 md:gap-3 flex-wrap">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug md:leading-tight">
          {prompt.title}
        </h2>

        {prompt.layout_key && (
          <span
            className={`badge badge-sm sm:badge-md ${
              PROMPT_TYPE_BADGE[prompt.layout_key]?.class || "badge-ghost"
            }`}
          >
            {PROMPT_TYPE_BADGE[prompt.layout_key]?.label || "Prompt"}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed md:leading-7">
        {prompt.description}
      </p>

      {/* EDITOR */}
      <div className="relative">
        {/* COPY BUTTON */}
        <button
          onClick={copyPrompt}
          className="
          absolute
          top-1
          right-1
          md:top-1
          md:right-1
          btn
          btn-xs
          sm:btn-sm
          btn-ghost
          opacity-70
          hover:opacity-100
          gap-1
          z-10
        "
        >
          {copied ? "Copied!" : <FiCopy size={14} />}
        </button>

        {/* READ-ONLY EDITOR */}
        <div
          ref={editorRef}
          contentEditable={false}
          spellCheck={false}
          className="
          min-h-25 
          px-2 sm:px-5 md:px-6
          py-5 sm:py-5 md:py-6
          border
          rounded-lg
          font-mono
          whitespace-pre-wrap
          leading-6 sm:leading-7 md:leading-8
          text-xs sm:text-sm md:text-base
          w-full
          bg-base-100
          cursor-default
          select-text
        "
        />
      </div>

      {/* VARIABLES */}
      <div className="space-y-4 md:space-y-5">
        {Object.entries(variables).map(([id, obj]) => (
          <div key={id} className="space-y-1 md:space-y-2">
            <label className="text-xs sm:text-sm md:text-base font-medium">
              {obj.label}
            </label>

            <textarea
              className="
              w-full
              p-3 sm:p-3 md:p-4
              border
              rounded-md
              font-mono
              text-xs sm:text-sm md:text-base
              resize-none
            "
              rows={1}
              value={obj.value}
              onChange={(e) => updateVariable(id, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mb-24 md:mb-28">
        <PromptActions
          promptType={prompt.layout_key}
          sendToAI={sendToAI}
          copyAndOpen={copyAndOpen}
        />
      </div>
    </div>
  );
}
