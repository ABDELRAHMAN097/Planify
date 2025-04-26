import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiBriefcase, FiPlus } from "react-icons/fi";

const initialSkillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "Django",
  "Next.js",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "مستخدم",
    skills: [],
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [skillsList, setSkillsList] = useState(initialSkillsList);
  const [newSkill, setNewSkill] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSkillChange = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter((s) => s !== skill),
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleAddNewSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skillsList.includes(trimmedSkill)) {
      setSkillsList([...skillsList, trimmedSkill]);
      setFormData({
        ...formData,
        skills: [...formData.skills, trimmedSkill],
      });
      setNewSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const checkUser = await axios.get(
        `http://localhost:3000/team?email=${formData.email}`
      );

      if (checkUser.data.length > 0) {
        setError("البريد الإلكتروني مسجل بالفعل");
        setIsSubmitting(false);
        return;
      }

      const userId = Date.now();

      const newTeamMember = {
        id: userId,
        name: formData.name,
        role: formData.role,
        email: formData.email,
        skills: formData.skills,
      };

      await axios.post("http://localhost:3000/team", newTeamMember);

      setSuccessMessage(
        "تم إنشاء الحساب بنجاح! يتم تحويلك إلى صفحة تسجيل الدخول..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("حدث خطأ أثناء التسجيل: " + err.message);
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-center"
          >
            إنشاء حساب جديد
          </motion.h2>
        </div>

        <div className="p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              {successMessage}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="relative">
              <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="role"
                placeholder="الوظيفة"
                value={formData.role}
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                المهارات:
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {skillsList.map((skill) => (
                  <motion.label
                    key={skill}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="accent-indigo-500"
                    />
                    <span className="text-gray-700">{skill}</span>
                  </motion.label>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="أضف مهارة جديدة"
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddNewSkill}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
