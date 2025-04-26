import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب بيانات العضو
        const memberRes = await fetch(`http://localhost:3000/team/${id}`);
        const memberData = await memberRes.json();
        
        // جلب المشاريع التي يعمل عليها العضو
        const projectsRes = await fetch('http://localhost:3000/projects');
        const allProjects = await projectsRes.json();
        
        const memberProjects = allProjects.filter(project => 
          project.team.includes(Number(id))
        );
        
        setMember(memberData);
        setProjects(memberProjects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const getRoleColor = (role) => {
    switch(role?.trim()) {
      case 'مطور ويب': return 'bg-blue-500';
      case 'باك اند': return 'bg-purple-500';
      case 'فرونت اند': return 'bg-green-500';
      case 'UI/UX': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>العضو غير موجود</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/TeamList" 
          className="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          العودة للفريق
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* رأس الصفحة */}
          <div className={`${getRoleColor(member.role)} p-6 text-white`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold text-gray-800">
                {member.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{member.name}</h1>
                <p className="text-xl opacity-90">{member.role}</p>
                <p className="opacity-80">{member.email}</p>
              </div>
            </div>
          </div>
          
          {/* محتوى الصفحة */}
          <div className="p-6 grid md:grid-cols-3 gap-6">
            {/* معلومات أساسية */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">المشاريع المشارك فيها</h2>
              {projects.length > 0 ? (
                <ul className="space-y-3">
                  {projects.map(project => (
                    <li key={project.id} className="border-b pb-3">
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">لا يوجد مشاريع مشارك فيها</p>
              )}
            </div>
            
            {/* معلومات إضافية */}
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map(skill => (
                    <span key={skill.id} className="px-3 py-1 bg-white rounded-full text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Contact info</h3>
                <p className="text-sm">Email : {member.email}</p>
                <p className="text-sm mt-1">Phone : {member.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;