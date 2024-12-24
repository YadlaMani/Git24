import React from "react";
import ShimmerButton from "./ui/shimmer-button";
import { FaGithubAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-center m-4">
      <nav className="flex justify-between items-center px-6 py-3 w-full max-w-2xl md:w-1/2 shadow-md border-b border-gray-200 bg-rose-100 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-lg font-bold text-rose-700">Git24</div>
            <div className="text-base font-bold text-gray-600">
              by @YadlaMani
            </div>
          </div>

          <a
            href="https://github.com/YadlaMani/Git24"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center"
          >
            <ShimmerButton className="flex items-center space-x-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-md transition">
              <FaGithubAlt className="text-base" />
              <span className="text-sm font-medium">Star on GitHub</span>
            </ShimmerButton>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
