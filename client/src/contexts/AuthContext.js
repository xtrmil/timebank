import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { Cookies } from "react-cookie";

const authContext = createContext();
const cookies = new Cookies();

const ContextProvider = ({ children }) => {
  const auth = useCreateAuthContext();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useCreateAuthContext = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin ] = useState(false);

  const login = () => {
    const session_token = cookies.get("session_token");
    if (session_token) {
      const decodedToken = jwt_decode(session_token);
      if (isValidToken(decodedToken)) {
        setLoggedInUser(decodedToken.user);
        if(decodedToken.user.authorities[0].authority === "ROLE_ADMIN"){
          setIsAdmin(true);
        }
        setIsLoggedIn(true);
      }
    }
  };

  const logout = () => {
    cookies.remove("session_token", {path:"/", domain:""});
  }

  const updateToken = (token) => {
    cookies.set("session_token", token);
    login();
  }

  useEffect(() => {
    login();
    setIsLoading(false);
  }, []);

  return {
    loggedInUser,
    isAdmin,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateToken
  };
};

const isValidToken = (token) => {
  if (token.exp < Date.now() / 1000) {
    return false;
  } else {
    return true;
  }
};
const useAuth = () => {
  return useContext(authContext);
};

export { ContextProvider, useAuth };
