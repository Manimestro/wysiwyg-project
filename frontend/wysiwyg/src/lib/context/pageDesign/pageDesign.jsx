import { createContext, useCallback, useEffect, useState } from "react";
import { useToken } from "../../utils/";

const InitialDeisgnState = {
  projectId: null,
  projectAuthor: "",
  pageUri: "",
  websiteSetting: {
    siteName: "My Website",
    favIco: "https://reactjs.org/favicon.ico",
    socialImage: "",
    desc: "Description for the webpage",
  },
  published: false,
  pageMode: 1,
  settigMode: -1,
  isDropEnabled: true,
  analyticsID: "",
  dropIndex: 0,
  fonts: [
    {
      font: "Poppins",
      weights: ["300", "regular", "700"],
    },
  ],
  elements: [],
};
export const pageDesignContext = createContext({});

export const useProvidePageDesign = () => {
  const [token] = useToken();
  const [tokenTracker, setTokenTracker] = useState(token);
  useEffect(() => {
    setTokenTracker(token);
  }, [token]);
  return {
    setTokenTracker,
  };
};

export const ProvidePageDesign = ({ children }) => {
  const pageDesign = useProvidePageDesign();
  return (
    <pageDesignContext.Provider value={pageDesign}>
      {children}
    </pageDesignContext.Provider>
  );
};
