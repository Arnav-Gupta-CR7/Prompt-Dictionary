import { Routes, Route} from "react-router-dom";
import Home from "./home/Home";


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}>
            <Route path="dashboard" element={<div>Dashboard Content</div>} />
            <Route path="profile" element={<div>Profile Content</div>} />
        </Route>
      </Routes>
  );
}

