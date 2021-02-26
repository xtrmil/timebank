import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { Cookies } from "react-cookie";

const context = createContext();
const cookies = new Cookies();

const ContextProvider = ({ children }) => {
  const auth = useCreateAuthContext();
  return <context.Provider value={auth}>{children}</context.Provider>;
};

const useCreateAuthContext = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = () => {
    const session_token = cookies.get("session_token");
    if (session_token) {
      const decodedToken = jwt_decode(session_token);
      if (isValidToken(decodedToken)) {
        setLoggedInUser(decodedToken.user);
        setIsLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    login();
    setIsLoading(false);
  }, []);

  return {
    loggedInUser,
    isLoggedIn,
    isLoading,
    login,
  };
};

const isValidToken = (token) => {
  if (token.exp < Date.now() / 1000) {
    console.log("expired token");
    return false;
  } else {
    return true;
  }
};
const useAuth = () => {
  return useContext(context);
};

export { ContextProvider, useAuth };
