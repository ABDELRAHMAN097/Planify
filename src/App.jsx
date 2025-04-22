import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import RecentActivity from "./features/dashboard/RecentActivity"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
      <Route path="/recent-activity" element={<RecentActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
