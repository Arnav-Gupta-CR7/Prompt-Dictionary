import { Outlet } from "react-router-dom";
import Home_nav from "./Home_nav"


export default function Home() {
    return (
        <>
            <Home_nav/>
            <div>
                <Outlet/>
            </div>
            
        </>
    );
}