import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../../components/ProgressBar";
import SearchFilter from "../../components/SearchFilter";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        await loadProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const currentStatus = project.status;

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">إدارة المشاريع</h1>
        <Link
          to="/projects/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full md:w-auto text-center"
        >
          إضافة مشروع جديد
        </Link>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  project.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : project.status === "in-progress"
                    ? "bg-blue-100 text-blue-800"
                    :  project.status === "planned" // الحالة الافتراضية لـ "planned"
                }`}
              >
                {project.status === "completed" && "مكتمل"}
                {project.status === "in-progress" && "قيد التنفيذ"}
                {project.status === "planned" && "مخطط"}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="mb-4">
              <ProgressBar progress={calculateProgress(project.tasks)} />
              <span className="text-sm text-gray-500 mt-1 block">
                {calculateProgress(project.tasks)}% مكتمل
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                المهام: {project.tasks?.length || 0}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                الفريق: {project.team?.length || 0}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                البدء: {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="space-x-2 flex items-center justify-center gap-2">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  <TbListDetails className="text-xl"/>

                </Link>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-green-500 hover:text-green-600 text-sm"
                >
                  <FiEdit className="text-xl"/>
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  <AiFillDelete className="text-xl"/>
                </button>
              </div>

              <Link
                to={`/projects/${project.id}/team`}
                className="text-purple-500 hover:text-purple-600 text-sm"
              >
                إدارة الفريق
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          لا توجد مشاريع متاحة
        </div>
      )}
    </div>
  );
};

export default Dashboard;
