import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import SearchFilter from '../../components/SearchFilter';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(savedProjects);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      loadProjects();
    }
  };

  const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    return (completed / tasks.length) * 100;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && calculateProgress(project.tasks) === 100) ||
      (filterStatus === 'in-progress' && calculateProgress(project.tasks) < 100);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">إدارة المشاريع</h1>
        <Link
          to="/projects/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto text-center"
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
          <div key={project.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                calculateProgress(project.tasks) === 100 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {calculateProgress(project.tasks) === 100 ? 'مكتمل' : 'قيد التنفيذ'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <ProgressBar progress={calculateProgress(project.tasks)} />
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                المهام: {project.tasks?.length || 0}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                الفريق: {project.team?.length || 0}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="space-x-2">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  التفاصيل
                </Link>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-green-500 hover:text-green-600 text-sm"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  حذف
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

      {filteredProjects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد مشاريع متاحة
        </div>
      )}
    </div>
  );
};

export default Dashboard;