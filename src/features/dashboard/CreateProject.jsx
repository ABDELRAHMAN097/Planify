import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    tasks: []
  });

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const response = await axios.get(`http://localhost:3000/projects/${id}`);
        setProject(response.data);
      };
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/projects/${id}`, project);
      } else {
        await axios.post('http://localhost:3000/projects', project);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{id ? 'تعديل المشروع' : 'مشروع جديد'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">اسم المشروع</label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">الوصف</label>
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">تاريخ البدء</label>
            <input
              type="date"
              value={project.startDate}
              onChange={(e) => setProject({ ...project, startDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">تاريخ الانتهاء</label>
            <input
              type="date"
              value={project.endDate}
              onChange={(e) => setProject({ ...project, endDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">حالة المشروع</label>
          <select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="planned">مخطط</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;