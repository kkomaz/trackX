import Navbar from "scenes/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "state";
import { ProjectCard } from "components/ProjectCard.jsx";

import { FaArrowRight, FaArrowLeft, FaProjectDiagram, FaCog } from 'react-icons/fa';


const Dashboard = () => {

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects) || [];
  const token = useSelector((state) => state.token);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getProjects = async () => {
    const response = await fetch("http://localhost:3001/projects/projects",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

    const data = await response.json();
      console.log(data);
    dispatch(setProjects(data))
  };

  useEffect(() => {
    getProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(projects);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className={`bg-gray-600 text-white transition-width duration-300 ease-in-out ${sidebarOpen ? 'w-36' : 'w-16'} flex-shrink-0`}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-4 w-full h-16 flex justify-center items-center">
            {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
          {sidebarOpen && (
            <ul className="flex flex-col items-center">
              <li className="mb-2 p-4 flex items-center justify-center w-full">
                <FaProjectDiagram className="mr-2" />
                <span>Projects</span>
              </li>
              <li className="mb-2 p-4 flex items-center justify-center w-full">
                <FaCog className="mr-2" />
                <span>Settings</span>
              </li>
            </ul>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl hover:text-indigo-500 font-semibold">PROJECTS</h2>
            <button className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
              + Create Project
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(({ title, _id }) => (
              <ProjectCard key={_id} title={title} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard