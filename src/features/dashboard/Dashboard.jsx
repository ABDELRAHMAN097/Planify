import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, deleteProject } from '../../data/db.json';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      await deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المشاريع</h1>
        <Link
          to="/projects/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          إضافة مشروع جديد
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {project.status}
              </span>
              <div className="space-x-2">
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-green-500 hover:text-green-600"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;