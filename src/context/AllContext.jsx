import { createContext, useState, useEffect } from "react";

export const AllContext = createContext({});

export function AllContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

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

  return (
    <AllContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AllContext.Provider>
  );
}
