import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    role: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      // Validate token (this is a placeholder, replace with actual validation logic)
      const isValidToken = parseData.token && parseData.token !== "invalid";
      if (isValidToken) {
        setAuth({
          user: parseData.user,
          token: parseData.token,
          role: parseData.role,
        });
      } else {
        localStorage.removeItem("auth");
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
