import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";

export const AllContext = createContext({});

export function AllContextProvider({ children }) {
  AllContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // احسب كل المهام اللي متخصصة لمستخدم معين
const getUserTasks = (userId) => {
  if (!projects || projects.length === 0) return [];
  
  let allTasks = [];

  projects.forEach((project) => {
    if (Array.isArray(project.tasks)) {
      const userTasks = project.tasks.filter((task) => task.assignedTo === userId);
      allTasks = [...allTasks, ...userTasks];
    }
  });

  return allTasks;
};

// احسب نسبة التقدم الخاصة بالمستخدم
const getUserProgress = (userId) => {
  const tasks = getUserTasks(userId);
  console.log("Tasks:", tasks);

  if (tasks.length === 0) return 0;

  const completed = tasks.filter(
    (task) => task.status.trim().toLowerCase() === "completed".toLowerCase()
  ).length;

  const progress = Math.round((completed / tasks.length) * 100);
  console.log("Completed:", completed, "Total:", tasks.length, "Progress:", progress);

  return progress;
};



  // Projects: تحميل البيانات
  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3000/projects");
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects.");
      toast.error(`Failed to load projects ${projects.name}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // حذف مشروع
 const handleDelete = async (id) => {
  try {
    // دور على اسم المشروع قبل ما تحذفه
    const deletedProject = projects.find((project) => project.id === id);

    await axios.delete(`http://localhost:3000/projects/${id}`);
    setProjects((prev) => prev.filter((project) => project.id !== id));
    
    toast.error(`${deletedProject?.name} REMOVED`);
  } catch (err) {
    toast.error(`Failed to delete project`);
  }
};


  // حساب التقدم (progress) على حسب المهام
 const calculateProgress = (project) => {
  if (!project.tasks || project.tasks.length === 0) {
    return {
      progress: 0,
      status: project.status || "planned" // الحالة الافتراضية إذا لم يكن هناك مهام
    };
  }

  const completedTasks = project.tasks.filter(
    task => task.status?.toLowerCase() === "completed"
  ).length;

  const progress = Math.round((completedTasks / project.tasks.length) * 100);
  
  let status = project.status;
  
  // تحديث الحالة بناءً على نسبة الإنجاز
   if (!project.status) {
      if (progress === 100) {
        status = "completed";
      } else if (progress > 0) {
        status = "in-progress";
      } else {
        status = "not-started";
      }
    }

  return { progress, status };
};

// حالة تسليم التاسكات من المطورين
const updateTaskStatus = async (projectId, taskId, newStatus) => {
  try {
    // 1. العثور على المشروع
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error("Project not found");
    
    // 2. تحديث حالة المهمة
    const updatedTasks = project.tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    
    // 3. إرسال التحديث إلى السيرفر
    await axios.patch(`http://localhost:3000/projects/${projectId}`, {
      tasks: updatedTasks
    });
    
    // 4. إعادة تحميل المشاريع
    await loadProjects();
    
    return true;
  } catch (err) {
    console.error("Error updating task:", err);
    toast.error("Failed to update task status");
    return false;
  }
};

  // signup
  const signup = async (
    values,
    setSubmitting,
    setErrors,
    setSuccessMessage,
    navigate
  ) => {
    try {
      const checkUser = await axios.get(
        `http://localhost:3000/team?email=${values.email}`
      );
      if (checkUser.data.length > 0) {
        setErrors({ email: "Email is already registered" });
        toast.error(`${values.email} Email is already registered`);
        setSubmitting(false);
        return;
      }

      const userId = Date.now();
      const newTeamMember = {
        id: userId,
        name: values.name,
        role: values.role,
        email: values.email,
        phone: values.phone,
        skills: values.skills,
        isAdmin: false,
        isLead: false,
      };

      await axios.post("http://localhost:3000/team", newTeamMember);

      toast.success(`Welcome ${values.name}! Account created successfully`);
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/Signin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  // signin
  const signin = async (email, password, navigate) => {
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });

    try {
      await validationSchema.validate({ email, password });
      setLoading(true);
      setError("");

      const response = await axios.get("http://localhost:3000/team", {
        params: { email, password },
      });

      if (response.data.length > 0) {
        setUser(response.data[0]);
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        navigate("/dashboard");
        return { success: true };
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        return { success: false };
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      } else {
        setError("حدث خطأ أثناء تسجيل الدخول");
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // user state and logout
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return (
    <AllContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        signup,
        signin,
        loading,
        error,
        setError,
        user,
        setUser,
        logout,
        projects,
        loadProjects,
        handleDelete,
        calculateProgress,
        getUserTasks, 
        getUserProgress,
        updateTaskStatus
      }}
    >
      {children}
    </AllContext.Provider>
  );
}
