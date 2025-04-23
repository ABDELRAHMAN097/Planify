import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProject = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "planned",
    team: [],
    tasks: [],
  });

  // جلب أعضاء الفريق من السيرفر
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/team");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberSelect = (memberId) => {
    const isSelected = formData.team.includes(memberId);
    setFormData({
      ...formData,
      team: isSelected
        ? formData.team.filter((id) => id !== memberId)
        : [...formData.team, memberId],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/projects", {
        ...formData,
        id: Date.now(), // إنشاء ID فريد
        createdAt: new Date().toISOString(),
      });
      alert("تم إنشاء المشروع بنجاح!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("حدث خطأ أثناء إنشاء المشروع");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        إنشاء مشروع جديد
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* اسم المشروع */}
        <div>
          <label className="block text-gray-700 mb-2">اسم المشروع</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* وصف المشروع */}
        <div>
          <label className="block text-gray-700 mb-2">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* تواريخ المشروع */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">تاريخ البدء</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">تاريخ الانتهاء</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* حالة المشروع */}
        <div>
          <label className="block text-gray-700 mb-2">الحالة</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="planned">مخطط</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>

        {/* اختيار أعضاء الفريق */}
        <div>
          <label className="block text-gray-700 mb-2">أعضاء الفريق</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {members.map((member) => (
              <div
                key={member.id}
                className={`p-2 border rounded cursor-pointer ${
                  formData.team.includes(member.id)
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleMemberSelect(member.id)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.team.includes(member.id)}
                    readOnly
                    className="accent-blue-500"
                  />
                  <span>{member.name}</span>
                  <span className="text-sm text-gray-500">({member.role})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            إنشاء المشروع
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
