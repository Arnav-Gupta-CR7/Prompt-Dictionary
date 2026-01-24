import { Routes, Route} from "react-router-dom";
import Home from "./home/Home";
import TrendingPrompts from "./home/components/TrendingPrompts";
import Prompt_area from "./home/components/Prompt_area";


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}>
            <Route index element={<TrendingPrompts />} />
            <Route path="prompt/:id" element={<Prompt_area />} />
        </Route>
      </Routes>
  );
}

