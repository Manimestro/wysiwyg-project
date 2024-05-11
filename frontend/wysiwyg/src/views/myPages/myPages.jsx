import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../lib/context";
// import UserProjects from './userProjects/userProjects';
import { useEffect } from "react";
import { CreateWebsiteModal } from "../../dumpComponents/createWebsiteModal";

export function MyPages() {
  let [mPr, setMPr] = useState({
    showNewWebsite: false,
  });

  let userDets = useContext(userContext);

  return (
    <>
      {/* <Navbar /> */}
      <div className="manage-web-container h-screen overflow-auto">
        <main className="manager_main">
          {mPr.showNewWebsite && (
            <CreateWebsiteModal
              closeModal={() => setMPr({ ...mPr, showNewWebsite: false })}
            />
          )}
          <div className="main_webpage bg-gray-200 min-h-screen">
            <div className="welcome-back-msg flex items-center px-4 py-3 bg-white">
              <div className="welcomeLeft flex-grow">
                <h1 className="text-xl font-bold">
                  Welcome back, {userDets.user.user}!
                </h1>
                <p>Select one of your sites to edit</p>
              </div>
              <button
                className="newWebsiteBtn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                onClick={() => setMPr({ ...mPr, showNewWebsite: true })}
              >
                Create new website
              </button>
            </div>
            <div className="projects_showcase max-w-2xl mx-auto">
              <div className="row-container">
                <div className="light-title-user-project py-2 text-gray-700">
                  My sites
                </div>
                {/* <UserProjects createNewWeb={() => setMPr({ ...mPr, showNewWebsite: true })} /> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
