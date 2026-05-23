import Pbtn from "../experiment/perplex";

/* ---------- CONFIG BY PROMPT TYPE ---------- */
const ACTIONS_BY_TYPE = {
  text_prompt: {
    showPerplex: true,
    platforms: ["chatgpt", "gemini", "grok", "claude"],
  },
  image_prompt: {
    showPerplex: false,
    platforms: ["midjourney", "dalle", "chatgpt", "gemini", "grok", "claude"],
  },
  music_prompt: {
    showPerplex: false,
    platforms: ["suno", "chatgpt"],
  },
  video_prompt: {
    showPerplex: false,
    platforms: ["chatgpt"],
  },
};

const PLATFORM_ICONS = {
  chatgpt: "/chatgpt.svg",
  gemini: "/gemini.svg",
  grok: "/grok.svg",
  claude: "/claude.svg",
  midjourney: "/midjourney.svg",
  dalle: "/dalle.svg",
  suno: "/suno.svg",
};

export default function PromptActions({ promptType, sendToAI, copyAndOpen }) {
  const config = ACTIONS_BY_TYPE[promptType] || ACTIONS_BY_TYPE.text_prompt;

  return (
    <div className="flex justify-between items-center">
      {/* LEFT: Pbtn only */}
      <div>
        {config.showPerplex && (
          <div onClick={sendToAI}>
            <Pbtn />
          </div>
        )}
      </div>

      {/* RIGHT: container pushed right, content left-aligned */}
      <div className="flex flex-col items-start">
        <div className="mb-2 text-xs text-error">
          Tip: Prompt is copied automatically — just paste
        </div>

        <div className="flex gap-x-2 items-center">
          {config.platforms.map((platform) => (
            <button
              key={platform}
              className="btn btn-sm"
              onClick={() => copyAndOpen(platform)}
            >
              <img
                src={PLATFORM_ICONS[platform]}
                className="h-5"
                alt={platform}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
