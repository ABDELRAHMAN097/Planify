import { useState, useContext } from "react";
import { FaHome, FaMoon, FaSun, FaTrello } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { AllContext } from "../context/AllContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode, user, logout } = useContext(AllContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="bg-white shadow-sm dark:bg-gray-900 dark:text-white">
        <div className="mx-14">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaTrello className="text-purple-600 h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-purple-600 dark:text-white">Planify</span>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link to="/" className="text-gray-700 hover:text-purple-600">
                <FaHome className="text-xl dark:text-white" />
              </Link>
              <Link
                to="/TeamList"
                className="text-gray-700 hover:text-purple-600 dark:text-white"
              >
                Team
              </Link>

              {user && (

                <Link
                to="/dashboard"
                className="text-gray-700 hover:text-purple-600 dark:text-white"
                >
                  Dashboard
                </Link>
                )}
              

              {user ? (

                <button
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                onClick={logout}
                >
                  <LogoutButton />
                </button>
              ) : (
              <Link to="/signup">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Getting started
                  </button>
                </Link>
              
            )}

              <button onClick={toggleDarkMode}>
                {darkMode ? (
                  <FaSun className="text-xl text-yellow-400" />
                ) : (
                  <FaMoon className="text-xl text-gray-800" />
                )}
              </button>
            </div>

            <button className="md:hidden p-2" onClick={handleMenuToggle}>
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700">
                Features
              </Link>
              <Link to="/TeamList" className="block px-3 py-2 text-gray-700">
                Team
              </Link>

              
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700">
                  Dashboard
                </Link>
            

              
                <button
                  className="w-full bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                  onClick={logout}
                >
                  <LogoutButton />
                </button>
             
                <Link to="/signup">
                  <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Getting started
                  </button>
                </Link>
              
            </div>
          </div>
        
      </nav>
    </div>
  );
};

export default Navbar;
