import { useState, useEffect, useContext } from "react";
import { useToken } from "./";
import { userContext } from "../context/";

export const useUser = () => {
  const [token] = useToken();

  let userDetailsState = useContext(userContext);

  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;

    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      let __userData = getPayloadFromToken(token);
      setUser(__userData);

      if (userDetailsState)
        userDetailsState.setUserDeatils({
          ...userDetailsState.user,
          user: __userData.username,
          email: __userData.email,
          _id: __userData.id,
          id: __userData.id,
        });
    }
  }, [token]);

  return user;
};
