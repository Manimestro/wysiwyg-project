import React, { useState, useContext } from "react";
import axios from "axios";
import { _backendUrl, useUser } from "../../lib/utils";
import { useToken } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../lib/context";

export function CreateWebsiteModal(props) {
  let navigate = useNavigate();
  const user = useUser();
  const [token] = useToken();
  let UserDetailsState = useContext(userContext);

  const { id } = user;

  let [newWebSetting, setNewWebSetting] = useState({
    webName: "My Website",
  });

  const createNewWebsite = async () => {
    if (newWebSetting.webName.length < 1) {
      alert("Website name can not be blank");
      return;
    }
    let __webName = newWebSetting.webName;
    __webName = __webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");

    axios
      .put(
        _backendUrl + `api/create-website/${id}`,
        {
          websiteName: __webName,
          pages: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        UserDetailsState.setEditorState({
          ...UserDetailsState.editorState,
          websiteId: response.data.webId,
          pageId: response.data.pageId,
        });

        props.closeModal();

        navigate(`/page/${response.data.webId}/`);
      })
      .catch((err) => {
        alert("Unable ", err);
      });
  };

  return (
    <div className="createNewWebsiteModal fixed flex items-center justify-center w-full h-full bg-black bg-opacity-20">
      <div className="modal_container min-w-400 bg-white rounded-lg border border-blue-500 shadow-md">
        <div className="modal_title bg-blue-500 p-2 flex">
          <span className="flex-grow text-sm">Create New Website</span>
          <button onClick={() => props.closeModal()} className="text-red-500">
            <i className="las la-times"></i>
          </button>
        </div>
        <div className="modal_cont p-4">
          <div className="moal-inputs">
            <h5>Website Name:</h5>
            <input
              type="text"
              onChange={(e) =>
                setNewWebSetting({ ...newWebSetting, webName: e.target.value })
              }
              value={newWebSetting.webName}
              className="w-full px-3 py-2 border rounded-md border-gray-300"
            />
          </div>
          <div className="createNewWebsiteOptions">
            <button
              onClick={() => createNewWebsite()}
              className="inline-block rounded-full px-4 py-2 uppercase bg-blue-500 text-white border border-blue-500 transition duration-200 ease-in-out hover:bg-white hover:text-blue-500 hover:border-blue-500"
            >
              Create new website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
