import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import image from "../assets/image1.svg";
import editIcon from "../assets/edit-brightness.svg";

import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUserId(localStorage.getItem("userId"));
    }
    if (userId) {
      setIsLogin(true);
    }
  }, [userId]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#" className="text-white font-bold">
                <img src={Logo} alt="" />
              </a>
            </div>
            {/*nav desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-5">
                <a
                  href="#"
                  className="text-black  transition duration-300 ease-in-out hover:text-[#722ED1] px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-black  transition duration-300 ease-in-out hover:text-[#722ED1] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-black  transition duration-300 ease-in-out hover:text-[#722ED1] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </a>

                {userId ? (
                  <Link
                    to="/dashboard"
                    className="text-black  transition duration-300 ease-in-out hover:text-[#722ED1] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-black  transition duration-300 ease-in-out hover:text-[#722ED1] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                )}

                <a
                  href="#"
                  className="bg-white transition duration-300 ease-in-out  text-[#722ED1]  py-2 px-6 text-center border border-solid rounded-3xl border-[#722ED1]  w-35 hover:bg-[#722ED1] hover:text-white hover:shadow-lg    text-sm font-medium"
                >
                  Start free trial
                </a>

                {/* <a
                  href=""
                  className=" "
                >
                  Start free trial
                </a> */}
              </div>
            </div>

            {/*nav mobile tablet */}
            <div className=" md:hidden">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={toggleNavbar}
                  className="hover:text-white transition duration-300 ease-in-out hover:bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FaAlignJustify size={30} />
                </button>
              </div>
            </div>
          </div>

          {/* mobile nav */}
          <div className="md:hidden">
            {/* mobile nav */}

            {isOpen && (
              <div className=" w-full md:block md:w-auto " id="navbar-default">
                <ul className="font-medium rounded-lg  flex flex-col p-4 md:p-0 mt-0 border border-gray-100 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    {userId ? (
                      <Link
                        to="/dashboard"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Profile
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* content tablet */}
          <div className=" md:hidden">
            <div className="grid grid-cols-1  gap-2 justify-items-center mt-10">
              <div className="grid grid-rows-4  gap-2  ">
                <div className="grid grid-cols-2 py-6">
                  <div className="font-medium w-64  cursor-pointer justify-self-start transition duration-300 ease-in-out text-[#722ED1] bg-[#F7F1FF] px-4 py-2 rounded-full flex items-center gap-3 hover:bg-white hover:text-[#722ED1] hover:shadow-lg  ">
                    <img src={editIcon} alt="" />
                    <p>
                      v3.1 released.
                      <u className="pl-1">
                        <a href="">Learn more</a>
                      </u>
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="font-bold text-4xl	">
                    Your data with <br /> real-time analytics
                  </h1>
                </div>
                <div>
                  <p className="font-medium	text-base opacity-50 ">
                    Harness the potential of Big Data Analytics & Cloud Services
                    and become a data-driven organization with Needle tail
                  </p>
                </div>
                <div>
                  <a
                    href=""
                    className="mr-4 bg-[#722ED1] transition duration-300 ease-in-out text-white py-2 px-6 text-center  rounded-3xl  w-35 hover:bg-white hover:text-[#722ED1] hover:shadow-lg    text-sm font-medium"
                  >
                    Start free trial
                  </a>
                  <a
                    href=""
                    className="bg-white  text-[#722ED1] transition duration-300 ease-in-out py-2 px-6 text-center  rounded-3xl  w-35 hover:bg-[#722ED1] hover:text-white hover:shadow-lg    text-sm font-medium"
                  >
                    Learn more
                  </a>
                </div>
              </div>
              <div className="">
                <img src={image} className="h-full" alt="" />
              </div>
            </div>
          </div>

          {/* content desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2  gap-4 justify-items-center mt-20">
              <div className="grid grid-rows-4  gap-2  ">
                <div className="grid grid-cols-2 py-6 md:py-16">
                  <div className="font-medium w-64  cursor-pointer transition duration-300 ease-in-out justify-self-start text-[#722ED1] bg-[#F7F1FF] px-4 py-2 rounded-full flex items-center gap-3 hover:bg-white hover:text-[#722ED1] hover:shadow-lg  ">
                    <img src={editIcon} alt="" />
                    <p>
                      v3.1 released.
                      <u className="pl-1">
                        <a href="">Learn more</a>
                      </u>
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="font-bold text-5xl	">
                    Your data with <br /> real-time analytics
                  </h1>
                </div>
                <div>
                  <p className="font-medium	text-base opacity-50 ">
                    Harness the potential of Big Data Analytics & Cloud Services
                    and become a data-driven organization with Needle tail
                  </p>
                </div>
                <div>
                  <a
                    href=""
                    className="mr-4 bg-[#722ED1]  transition duration-300 ease-in-out text-white py-2 px-6 text-center  rounded-3xl  w-35 hover:bg-white hover:text-[#722ED1] hover:shadow-lg    text-sm font-medium"
                  >
                    Start free trial
                  </a>
                  <a
                    href=""
                    className="bg-white  transition duration-300 ease-in-out text-[#722ED1] py-2 px-6 text-center  rounded-3xl  w-35 hover:bg-[#722ED1] hover:text-white hover:shadow-lg    text-sm font-medium"
                  >
                    Learn more
                  </a>
                </div>
              </div>
              <div className="">
                <img src={image} className="h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-shape h-64 w-full"></div>
      </nav>
    </>
  );
};

export default Navbar;
