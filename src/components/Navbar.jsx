import React from "react";
import "../styles/Navbar.css"; // Import your CSS file where you define the animation
import { FiGithub } from "react-icons/fi";

const Navbar = () => {
  return (
    <div>
      <div className="navBar flex items-center justify-between w-screen">
        <div>
          <h1 className="text-4xl font-medium animate-color-change p-6">
            😼meowtype
          </h1>
        </div>
        <a href="https://github.com/manpreetnub23" target="_blank"><FiGithub className="animate-color-change text-3xl m-12 text-[#ff4949]" style={{animationDelay: '3s'}} /></a>
      </div>
    </div>
  );
};

export default Navbar;
