import React from "react";
import { Link } from "react-router-dom";

export function Homepage() {
  return (
    <div className="w-">
      <div className="">
        <header className="flex items-center w-[100vw] justify-between bg-white h-[9vh] p-5">
          <div className="flex-1">
            <h1 className="font-bold text-xl">WYSIWYG Builder</h1>
          </div>
          <nav className=" text-right">
            <ul className="flex">
              <li className="mr-6">
                <Link to="/login" className="text-blue-500 hover:text-blue-800">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-blue-500 hover:text-blue-800"
                >
                  signup
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="bg-blue-800 flex items-center h-[91vh] p-5">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl text-white font-bold mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="text-white text-lg mb-8">
 Dignissimos distinctio ipsum reprehenderit amet neque dolorum animi laboriosam ut sapiente provident ad, optio totam eum nam quaerat, magnam fugit soluta doloribus.
            </p>
            <Link
              to="/signup"
              className="bg-white text-blue-800 py-3 px-8 rounded-full font-semibold uppercase text-lg hover:bg-blue-200"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
