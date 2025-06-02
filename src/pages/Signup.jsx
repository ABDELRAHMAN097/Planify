import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AllContext } from "../context/AllContext";
import { validationSchema } from "../lib/utils/validation";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiBriefcase,
  FiPlus,
  FiArrowRight
} from "react-icons/fi";
import { motion } from "framer-motion";

const Signup = () => {
  const [skillsList, setSkillsList] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "Python",
    "Django",
    "Next.js",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { signup } = useContext(AllContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      skills: [],
      isAdmin: false,
      isLead: false,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      signup(values, setSubmitting, setErrors, setSuccessMessage, navigate);
    },
  });

  const handleSkillChange = (skill) => {
    if (formik.values.skills.includes(skill)) {
      formik.setFieldValue(
        "skills",
        formik.values.skills.filter((s) => s !== skill)
      );
    } else {
      formik.setFieldValue("skills", [...formik.values.skills, skill]);
    }
  };

  const handleAddNewSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skillsList.includes(trimmedSkill)) {
      setSkillsList([...skillsList, trimmedSkill]);
      formik.setFieldValue("skills", [...formik.values.skills, trimmedSkill]);
      setNewSkill("");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-4"
      >
        <motion.form
          onSubmit={formik.handleSubmit}
          className="w-full p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-center mb-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              إنشاء حساب جديد
            </h2>
          </div>

          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-lg mb-6 text-sm border border-green-100 dark:border-green-900/50 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {successMessage}
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* الاسم - Column 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الاسم الكامل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiUser className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`pl-10 w-full rounded-lg border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 p-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="أحمد محمد"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* البريد الإلكتروني - Column 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`pl-10 w-full rounded-lg border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 p-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="example@domain.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* كلمة المرور - Column 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`pl-10 w-full rounded-lg border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 p-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* الهاتف - Column 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                رقم الهاتف
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiPhone className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`pl-10 w-full rounded-lg border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 p-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="05XXXXXXXX"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* الدور - Column 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الدور الوظيفي
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiBriefcase className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  className={`pl-10 w-full rounded-lg border ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 p-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="مطور واجهات أمامية"
                />
              </div>
              {formik.touched.role && formik.errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.role}
                </p>
              )}
            </div>

            {/* Empty div to maintain grid alignment */}
            <div></div>
          </div>

          {/* المهارات - Full width below the 2-column layout */}
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المهارات
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skillsList.map((skill, index) => (
                <motion.button
                  type="button"
                  key={index}
                  onClick={() => handleSkillChange(skill)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    formik.values.skills.includes(skill)
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="أضف مهارة جديدة"
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 p-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <motion.button
                type="button"
                onClick={handleAddNewSkill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
              >
                <FiPlus className="h-5 w-5" />
              </motion.button>
            </div>
            {formik.touched.skills && formik.errors.skills && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.skills}
              </p>
            )}
          </div>

          <div className="mt-4 space-y-4">
            <motion.button
              type="submit"
              disabled={formik.isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center"
            >
              {formik.isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري التسجيل...
                </>
              ) : (
                <>
                  إنشاء الحساب
                  <FiArrowRight className="mr-2" />
                </>
              )}
            </motion.button>

            <div className="flex items-center justify-center">
              <Link to="/Signin" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center">
                لديك حساب بالفعل؟ تسجيل الدخول
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Signup;