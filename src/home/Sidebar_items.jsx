import { FaHouse } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import { TbWritingSign } from "react-icons/tb";
import { FaPeopleRobbery } from "react-icons/fa6";
import { GiBlackBook } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { IoBulbOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import { RiDrinks2Line } from "react-icons/ri";
import { LuHandHelping } from "react-icons/lu";
import { MdSelfImprovement } from "react-icons/md";
import { GiMetalBar } from "react-icons/gi";

export default function Sidebar_items() {
    return (
        <>
            <div>
                <li className="text-xl"><a>Home <FaHouse/></a></li>
                <li className="text-2xl mt-8 mb-4 ml-3">category</li>
                <li><a>Thinking & Problem Solving <LuBrain /></a></li>
                <li><a>Writing & Communication  <TbWritingSign /></a></li>
                <li><a>Conversation & Social Life <FaPeopleRobbery /></a></li>
                <li><a>Learning & Studying <GiBlackBook /></a></li>
                <li><a>Work & Productivity <GrUserWorker /></a></li>
                <li><a>Creativity & Ideas <IoBulbOutline /></a></li>
                <li><a>Analysis & Research <GrAnalytics /></a></li>
                <li><a>Tech & Coding <BsRobot/></a></li>
                <li><a>Health, Habits & Lifestyle <RiDrinks2Line /></a></li>
                <li><a>Daily Life & Practical Help <LuHandHelping /></a></li>
                <li><a>Goal Setting & Self Reflection <MdSelfImprovement /></a></li>
                <li><a>Meta Prompts <GiMetalBar /></a></li>
            </div>
        </>
    );
}
