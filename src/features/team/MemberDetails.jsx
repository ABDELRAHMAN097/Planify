import { useEffect, useState, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { AllContext } from "../../context/AllContext";
import { toast } from "react-toastify";

const MemberDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
    user,
    projects,
    loadProjects,
    getUserTasks,
    getUserProgress,
    updateTaskStatus,
  } = useContext(AllContext);

  const [member, setMember] = useState(null);
  const [memberProjects, setMemberProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const roleColors = {
    مطورويب: "bg-blue-500",
    webdeveloper: "bg-blue-500",
    باكاند: "bg-purple-500",
    backend: "bg-purple-500",
    "فرونت اند": "bg-green-500",
    frontend: "bg-green-500",
    uiux: "bg-pink-500",
    مصممuiux: "bg-pink-500",
  };

  const normalizeRole = (role) => {
    return (
      role
        ?.toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "") || ""
    );
  };

  const getRoleColor = (role) => {
    const normalizedRole = normalizeRole(role);
    return roleColors[normalizedRole] || "bg-gray-500";
  };

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/team/${id}`);
        const memberData = await res.json();
        setMember(memberData);

        // Load projects if not already loaded
        if (!projects || projects.length === 0) {
          await loadProjects();
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id, location.search]);

  useEffect(() => {
    if (member && projects && projects.length > 0) {
      const memberId = Number(id);
      const filteredProjects = projects
        .filter((project) => project.team?.includes(memberId))
        .map((project) => ({
          ...project,
          tasks: getUserTasks(memberId).filter((task) =>
            project.tasks?.some((pt) => pt.id === task.id)
          ),
          progress: getUserProgress(memberId),
        }));

      setMemberProjects(filteredProjects);
    }
  }, [projects, member, id]);

  const handleTaskStatusChange = async (projectId, taskId, newStatus) => {
    if (!user || user.id !== Number(id)) {
      toast.error("You can only update your own tasks");
      return;
    }

    try {
      const success = await updateTaskStatus(projectId, taskId, newStatus);
      if (success) {
        toast.success("Task status updated successfully");
      }
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task status");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex justify-center items-center h-screen">
        Member not found
      </div>
    );
  }

  const isCurrentUser = user && user.id === Number(id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/TeamList">
          <button className="flex items-center justify-start gap-2 mb-6 px-4 py-2 bg-purple-500 text-white dark:bg-gray-900 dark:text-whiterounded dark:border rounded hover:bg-gray-300">
            <IoChevronBackCircleSharp />
            Back to the team
          </button>
        </Link>

        <div className="bg-white dark:bg-gray-900 dark:text-white dark:border rounded-xl shadow-lg overflow-hidden">
          <div className={`${getRoleColor(member.role)} p-6 text-white`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold text-gray-800">
                {member.name?.charAt(0) || "?"}
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {member.name || "No Name"}
                </h1>
                <p className="text-xl opacity-90">{member.role || "No Role"}</p>
                <p className="opacity-80">{member.email || "No Email"}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">
                {isCurrentUser ? "Your Projects" : `${member.name}'s Projects`}
              </h2>
              {memberProjects.length > 0 ? (
                <ul className="space-y-6">
                  {memberProjects.map((project) => (
                    <li
                      key={project.id}
                      className="border-b pb-4 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">
                            {project.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {project.description}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            project.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : project.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {project.progress}% complete (
                          {isCurrentUser ? "your" : "their"} tasks)
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">
                          {isCurrentUser ? "Your Tasks" : "Assigned Tasks"}:
                        </h4>
                        {project.tasks.length > 0 ? (
                          <ul className="space-y-2">
                            {project.tasks.map((task) => (
                              <li
                                key={task.id}
                                className="flex justify-between items-center"
                              >
                                <span>{task.title}</span>
                                {isCurrentUser ? (
                                  <div className="flex gap-1">
                                    <button
                                      className={`px-2 py-1 text-xs rounded ${
                                        task.status === "Not Started"
                                          ? "bg-yellow-500 text-white"
                                          : "bg-gray-200 text-black hover:bg-yellow-100"
                                      }`}
                                      onClick={() =>
                                        handleTaskStatusChange(
                                          project.id,
                                          task.id,
                                          "Not Started"
                                        )
                                      }
                                      disabled={!isCurrentUser}
                                    >
                                      Not Started
                                    </button>
                                    <button
                                      className={`px-2 py-1 text-xs rounded ${
                                        task.status === "In Progress"
                                          ? "bg-blue-600 text-white"
                                          : "bg-gray-200 text-black hover:bg-blue-100"
                                      }`}
                                      onClick={() =>
                                        handleTaskStatusChange(
                                          project.id,
                                          task.id,
                                          "In Progress"
                                        )
                                      }
                                      disabled={!isCurrentUser}
                                    >
                                      In Progress
                                    </button>
                                    <button
                                      className={`px-2 py-1 text-xs rounded ${
                                        task.status === "Completed"
                                          ? "bg-green-600 text-white"
                                          : "bg-gray-200 text-black hover:bg-green-100"
                                      }`}
                                      onClick={() =>
                                        handleTaskStatusChange(
                                          project.id,
                                          task.id,
                                          "Completed"
                                        )
                                      }
                                      disabled={!isCurrentUser}
                                    >
                                      Completed
                                    </button>
                                  </div>
                                ) : (
                                  <span
                                    className={`text-xs px-2 py-1 rounded ${
                                      task.status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : task.status === "In Progress"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {task.status}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No tasks assigned{" "}
                            {isCurrentUser ? "to you" : "to this member"} in
                            this project.
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  {isCurrentUser ? "You are" : "This member is"} not involved in
                  any projects.
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-900 dark:text-white dark:border p-4 rounded-lg">
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills?.length ? (
                    member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span>No skills registered</span>
                  )}
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-900 dark:text-white dark:border p-4 rounded-lg">
                <h3 className="font-medium mb-2">Info</h3>
                <p className="text-sm">Email: {member.email}</p>
                <p className="text-sm mt-1">Phone: {member.phone}</p>
                <p className="text-sm mt-1">Role: {member.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
