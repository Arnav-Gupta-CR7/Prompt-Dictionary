// pages/AIChatPage.jsx

import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AIChatBox from "./AIChatBox";
import { SiOllama } from "react-icons/si";

const AIChatPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        bg-base-100
        px-4
        py-6
        lg:px-8
        lg:py-8
      "
    >
      {/* TOP BAR */}
      <div
        className="
          max-w-6xl
          mx-auto
          mb-6
          flex
          items-center
          justify-between
        "
      >
        {/* LEFT */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="
      btn
      btn-ghost
      border-2
      border-base-300
      rounded-2xl
    "
          >
            <FaArrowLeft />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <LuSparkles className="text-sm" />

              <h1 className="text-2xl font-bold">
                Prompt Dictionary Assistant
              </h1>
            </div>

            <p className="text-sm opacity-70 mt-1">
              Ask anything. Explore ideas. Generate insights.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="
              badge
              badge-outline
              badge-lg
              px-4
              py-4
              border
            "
          >
            powered by <SiOllama className="text-sm" /> llama 3.3
          </div>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div
        className="
            max-w-6xl
            mx-auto
            h-[70vh]
            border
            
            rounded-2xl
            bg-base-100
            overflow-hidden
            
            p-5
        "
      >
        <AIChatBox />
      </div>
    </div>
  );
};

export default AIChatPage;
