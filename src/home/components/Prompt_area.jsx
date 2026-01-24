import '../var.css'
import { useEffect, useRef, useState } from "react";
import Pbtn from '../experiment/perplex'

export default function Prompt_area() {
  const editorRef = useRef(null);
  const rawTextRef = useRef("");

  const [meta, setMeta] = useState(null);
  const [variables, setVariables] = useState({});

  /* ================= ESCAPE HTML ================= */
  const escapeHtml = (text) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ================= RENDER ================= */
  const renderText = (text) => {
    if (!editorRef.current) return;

    const escaped = escapeHtml(text);
    const highlighted = escaped.replace(
      /&lt;&lt;([\s\S]*?)&gt;&gt;/g,
      `<span class="var">&lt;&lt;$1&gt;&gt;</span>`
    );

    editorRef.current.innerHTML = highlighted;
  };

  /* ================= EXTRACT VARIABLES ================= */
  const extractVariables = (text) => {
    const matches = [...text.matchAll(/<<([\s\S]*?)>>/g)];

    setVariables((prev) => {
      const next = { ...prev };

      matches.forEach((m, i) => {
        const id = `var_${i}`;
        if (!next[id]) {
          next[id] = {
            label: m[1],   // 👈 initial variable name
            value: m[1]
          };
        }
      });

      return next;
    });
  };

  /* ================= UPDATE VARIABLE ================= */
  const updateVariable = (id, value) => {
    setVariables((prev) => {
      const updated = {
        ...prev,
        [id]: { ...prev[id], value }
      };

      let i = 0;
      const updatedText = rawTextRef.current.replace(
        /<<([\s\S]*?)>>/g,
        () => `<<${updated[`var_${i++}`].value}>>`
      );

      rawTextRef.current = updatedText;
      renderText(updatedText);

      return updated;
    });
  };

  /* ================= FETCH TEMPLATE ================= */
  useEffect(() => {
    fetch("http://localhost:4000/api/prompt/3")
      .then(res => res.json())
      .then(data => {
        setMeta(data);
        rawTextRef.current = data.template;
        extractVariables(data.template);
        renderText(data.template);
      });
  }, []);

  /* ================= EDITOR INPUT ================= */
  const handleEditorInput = () => {
    const text = editorRef.current.innerText;
    rawTextRef.current = text;
    extractVariables(text);
    renderText(text);
  };

  /* ================= SEND ================= */
  const sendToAI = () => {
    const url = `https://perplexity.ai/?q=${encodeURIComponent(
      rawTextRef.current
    )}`;
    window.open(url, "_blank");
  };

  /* =================COPY AND OPEN =====================*/
  const copyAndOpen = async (platform) => {
    try {
      // 1️⃣ Copy prompt
      await navigator.clipboard.writeText(rawTextRef.current);

      // 2️⃣ Platform URLs
      const urls = {
        chatgpt: "https://chatgpt.com/",
        gemini: "https://gemini.google.com/app",
        grok: "https://grok.x.com/",
        claude: "https://claude.ai/new"
      };

      window.open(urls[platform], "_blank");
    } catch (err) {
      alert("Failed to copy prompt");
    }
  };



  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">{meta?.title}</h2>
      <p className="text-sm text-gray-500">{meta?.description}</p>

      {/* EDITOR */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleEditorInput}
        className="min-h-35 p-3 border rounded-md font-mono whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-primary"
        spellCheck={false}
      />

      {/* VARIABLES BELOW EDITOR */}
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



      <div className='flex justify-between items-center'>
        <div onClick={sendToAI}>
          <Pbtn/>
        </div>
        
          
        

        
        <div className='px-3 pb-3 pt-1 '>
          <div className=' mb-5 text-xs text-error'>
            Tip: Use ctrl + V to paste 
          </div >
            <div className='flex gap-x-2'>
              <button className='btn ' onClick={()=>{copyAndOpen('chatgpt')}}>
                <img src="/chatgpt.svg" className='h-5'/>
              </button>
              <button className='btn ' onClick={()=>{copyAndOpen('gemini')}}>
                <img src="/gemini.svg" className='h-5'/>
              </button>
              <button className='btn ' onClick={()=>{copyAndOpen('grok')}}>
                <img src="/grok.svg" className='h-5'/>
              </button>
              <button className='btn ' onClick={()=>{copyAndOpen('claude')}}>
                <img src="/claude.svg" className='h-5'/>
              </button>
            </div>
          </div>
          

      </div>
    </div>
  );
}
