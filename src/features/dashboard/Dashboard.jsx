import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import ProgressBar from "../../components/ProgressBar";
import SearchFilter from "../../components/SearchFilter";
import { AllContext } from "../../context/AllContext";

const Dashboard = () => {
  const {
    projects,
    loading,
    error,
    loadProjects,
    handleDelete,
    calculateProgress,
  } = useContext(AllContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = projects.filter((project) => {
    if (!project) return false;

    const name = project.name || "";
    const description = project.description || "";
    const currentStatus = project.status || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (filterStatus === "all" || filterStatus === currentStatus)
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={loadProjects}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <Link
          to="/projects/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full md:w-auto text-center"
        >
          Create New Project
        </Link>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No projects found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const { progress, status } = calculateProgress(project);
            const tasksCount = project.tasks?.length || 0;
            const teamCount = project.team?.length || 0;
            const startDate = project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "Not set";
            const endDate = project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "Not set";

            return (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-900 dark:border dark:border-purple-500 p-4 rounded-lg shadow hover:shadow-lg transition-shadow hover:scale-[1.02] transition-transform"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">
                    {project.name || "Untitled Project"}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      status === "completed"
                        ? "bg-green-100 text-green-800"
                        : status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status || "unknown"}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 h-12">
                  {project.description || "No description available"}
                </p>

                {/* Progress Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Project Progress</span>
                    <span className="text-sm font-bold">{progress}%</span>
                  </div>
                  <ProgressBar progress={progress} />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>
                      {tasksCount > 0
                        ? `${tasksCount} task${tasksCount !== 1 ? "s" : ""}`
                        : "No tasks"}
                    </span>
                    <span>
                      {status === "completed"
                        ? "Completed"
                        : `${progress}% done`}
                    </span>
                  </div>
                </div>

                {/* Project Meta */}
                <div className="mt-4 flex items-center justify-start flex-wrap gap-2">
                  <Link to={`/tasks-list/${project.id}`}>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm text-purple-500 hover:text-purple-600 dark:bg-purple-600 dark:text-white">
                      Tasks: {tasksCount}
                    </span>
                  </Link>
                  <Link to={`/project/${project.id}/team`}>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm text-purple-500 hover:text-purple-600 dark:bg-purple-600 dark:text-white">
                      Team: {teamCount}
                    </span>
                  </Link>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm text-purple-500 hover:text-purple-600 dark:bg-purple-600 dark:text-white">
                    Start: {startDate}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm text-purple-500 hover:text-purple-600 dark:bg-purple-600 dark:text-white">
                    End: {endDate}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="space-x-2 flex items-center justify-center gap-2">
                    <Link
                      to={`/projects/edit/${project.id}`}
                      className="text-green-500 hover:text-green-600 text-sm"
                    >
                      <FiEdit className="text-xl" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-slate-500 hover:text-slate-600 text-sm"
                    >
                      <AiFillDelete className="text-xl" />
                    </button>
                  </div>

                  <Link
                    to={`/project/${project.id}/manage-team`}
                    className="text-purple-500 hover:text-purple-600 hover:bg-slate-200 p-1 rounded-md border border-purple-500 text-sm"
                  >
                    Manage Team
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;