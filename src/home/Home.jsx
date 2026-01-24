import { Outlet } from "react-router-dom";
import Hot_cards from "./experiment/Hot_cards";
import Prompt_area from "./experiment/Prompt_area";
import Home_login_exp from "./experiment/Home_login_exp";
import Home_nav from "./Home_nav";

export default function Home() {
    return (
        <>
            <Home_nav/>
            
            
            <div>
                <Prompt_area/>
            </div>
            <Outlet/>
        </>
    );
}