import { Link } from "react-router-dom";

import { FaHouse, FaPeopleRobbery } from "react-icons/fa6";
import { LuBrain, LuHandHelping } from "react-icons/lu";
import { TbWritingSign } from "react-icons/tb";
import { GiBlackBook, GiMetalBar } from "react-icons/gi";
import { GrUserWorker, GrAnalytics } from "react-icons/gr";
import { IoBulbOutline } from "react-icons/io5";
import { BsRobot } from "react-icons/bs";
import { RiDrinks2Line } from "react-icons/ri";
import { MdSelfImprovement } from "react-icons/md";


export default function Sidebar_items() {

  const closeDrawer = () => {
    document.getElementById("my-drawer-1").checked = false;
  };


  return (
    <>
      <div onClick={closeDrawer}>
        <li className="text-xl">
          <Link to="/">Home <FaHouse /></Link>
        </li>

        {/* TEXT */}
        <li className="text-2xl mt-8 mb-4 ml-3">Text Prompts</li>
        <li><Link to="/category/thinking-problem-solving">Thinking & Problem Solving <LuBrain /></Link></li>
        <li><Link to="/category/writing-communication">Writing & Communication <TbWritingSign /></Link></li>
        <li><Link to="/category/conversation-social">Conversation & Social <FaPeopleRobbery /></Link></li>
        <li><Link to="/category/learning-studying">Learning & Studying <GiBlackBook /></Link></li>
        <li><Link to="/category/work-productivity">Work & Productivity <GrUserWorker /></Link></li>
        <li><Link to="/category/creativity-ideas">Creativity & Ideas <IoBulbOutline /></Link></li>
        <li><Link to="/category/analysis-research">Analysis & Research <GrAnalytics /></Link></li>
        <li><Link to="/category/health-habits-lifestyle">Health, Habits & Lifestyle <RiDrinks2Line /></Link></li>
        <li><Link to="/category/daily-life-practical-help">Daily Life & Practical Help <LuHandHelping /></Link></li>
        <li><Link to="/category/goal-setting-self-reflection">Goal Setting & Self Reflection <MdSelfImprovement /></Link></li>
        <li><Link to="/category/meta-prompts">Meta Prompts <GiMetalBar /></Link></li>

        

        {/* IMAGE */}
        <li className="text-2xl mt-8 mb-4 ml-3">Image Prompts</li>
        <li><Link to="/category/ai-art-image-generation">AI Art & Image Generation</Link></li>
        <li><Link to="/category/photography-styles">Photography Styles</Link></li>
        <li><Link to="/category/illustration-concept-art">Illustration & Concept Art</Link></li>
        <li><Link to="/category/ui-ux-design">UI / UX & Design</Link></li>
        <li><Link to="/category/branding-marketing-visuals">Branding & Marketing Visuals</Link></li>
        
        {/* MUSIC */}
        <li className="text-2xl mt-8 mb-4 ml-3">Music Prompts</li>
        <li><Link to="/category/music-sound-design">Music & Sound Design</Link></li>
        
        {/* VIDEO */}
        <li className="text-2xl mt-8 mb-4 ml-3">Video Prompts</li>
        <li><Link to="/category/video-motion">Video & Motion</Link></li>
        
        {/* CODE */}
        <li className="text-2xl mt-8 mb-4 ml-3">Code Prompts</li>
        <li><Link to="/category/tech-coding">Tech & Coding <BsRobot /></Link></li>
        
      </div>
    </>
  );
}
