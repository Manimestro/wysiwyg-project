import { useState, useEffect, createContext } from "react";
import { useUser } from "../../utils/";

const initialUserDetails = {
  user: "",
  email: "",
  _id: "",
  pageId: "",
  websiteId: "",
  id: "",
};
export const userContext = createContext();

const useProvideUser = () => {
  const [user, setUserDeatils] = useState(initialUserDetails);
  const [editorState, setEditorState] = useState({});
  const userData = useUser();
  useEffect(() => {
    if (userData) {
      setUserDeatils({ ...userData, user: userData.username });
    }
  }, [userData]);
  return { user, setUserDeatils, editorState, setEditorState };
};

export const ProvideUser = (props) => {
  const userData = useProvideUser();
  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};
