import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./features/dashboard/Dashboard.jsx";
import CreateProject from "./features/dashboard/CreateProject.jsx";
import TeamList from "./features/team/TeamList.jsx";
import MemberDetails from "./features/team/MemberDetails.jsx";
import ProjectTeam from "./features/projects/ProjectTeam.jsx";
import ProjectTeamManager from "./features/team/ProjectTeamManager.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/TeamList" element={<TeamList />} />
        <Route path="/team/:id" element={<MemberDetails />} />
        <Route path="/project/:id/team" element={<ProjectTeam />} />
        <Route path="/project/:id/manage-team" element={<ProjectTeamManager />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
