// components/AIChatBox.jsx

import { useState } from "react";
import { FiSend, FiFileText } from "react-icons/fi";

const AIChatBox = ({ prompt = null }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const callAI = async (userPrompt, summaryMode = false) => {
    setLoading(true);

    const userMessage = {
      role: "user",
      content: userPrompt,
    };

    if (!summaryMode) {
      setMessages((prev) => [...prev, userMessage]);
    }

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },

          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",

            messages: [
              {
                role: "system",

                content: prompt
                  ? `
You are an AI assistant helping users understand a prompt.

PROMPT TITLE:
${prompt?.title || ""}

PROMPT DESCRIPTION:
${prompt?.description || ""}

PROMPT CATEGORY:
${prompt?.category_name || ""}

IMPORTANT:
Return ONLY valid JSON.

JSON FORMAT:
{
  "title": "short heading",
  "sections": [
    {
      "heading": "section heading",
      "content": "section explanation"
    }
  ]
}

RULES:
- Keep responses concise
- Use multiple sections if needed
- No markdown
- No code blocks
- No extra text outside JSON
`
                  : `
You are a helpful AI assistant.

IMPORTANT:
Return ONLY valid JSON.

JSON FORMAT:
{
  "title": "short heading",
  "sections": [
    {
      "heading": "section heading",
      "content": "section explanation"
    }
  ]
}

RULES:
- Keep responses concise
- Use multiple sections if needed
- No markdown
- No code blocks
- No extra text outside JSON
`,
              },

              {
                role: "user",
                content: userPrompt,
              },
            ],
          }),
        },
      );

      const data = await res.json();

      const raw = data.choices?.[0]?.message?.content || "{}";

      const parsed = JSON.parse(raw);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          data: parsed,
        },
      ]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    await callAI(input);

    setInput("");
  };

  const generateSummary = async () => {
    await callAI("Generate a concise summary of this prompt.", true);
  };

  return (
    <div className="flex flex-col h-full min-h-0 ">
      {/* HEADER */}
      <div className="pb-4 border-b border-base-300">
        <h2 className="font-semibold text-lg">
          {prompt ? "AI Prompt Assistant" : "AI Assistant"}
        </h2>

        <p className="text-xs opacity-70 mt-1 line-clamp-2">
          {prompt ? prompt?.title : "Ask anything"}
        </p>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
        {messages.map((msg, index) => (
          <div key={index}>
            {/* USER */}
            {msg.role === "user" && (
              <div className="flex justify-end mb-3">
                <div
                  className="
                    max-w-[85%]
                    bg-base-200
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                  "
                >
                  {msg.content}
                </div>
              </div>
            )}

            {/* AI */}
            {msg.role === "assistant" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-base">{msg.data?.title}</h3>

                {msg.data?.sections?.map((section, idx) => (
                  <div
                    key={idx}
                    className="
                        border
                        border-base-300
                        rounded-xl
                        p-4
                        bg-base-100
                      "
                  >
                    <h4 className="font-medium text-sm mb-2">
                      {section.heading}
                    </h4>

                    <p className="text-sm opacity-80 leading-7 whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <span className="loading loading-dots loading-sm"></span>
            <span className="text-sm opacity-70">Thinking...</span>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="pt-4 border-t border-base-300">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about this prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="input input-bordered flex-1"
          />

          {/* SEND BUTTON */}
          <button
            onClick={sendMessage}
            className="btn btn-secondary"
            disabled={loading}
          >
            <FiSend />
          </button>

          {/* SUMMARY BUTTON */}
          <div className="tooltip tooltip-top" data-tip="Generate AI Summary">
            <button
              onClick={generateSummary}
              className="
      btn
      btn-ghost
      border
      border-base-300
      text-base-content/70
      hover:bg-base-200
      hover:border-base-400
    "
              disabled={loading}
            >
              <FiFileText />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBox;
