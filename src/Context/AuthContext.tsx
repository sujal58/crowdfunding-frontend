import { createContext, useContext, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

type AuthContextType = {
  token: string;
  username: string;
  roles: string[];
  status: string;
  login: (userData: userDataType) => void;
  logout: () => void;
};

type userDataType = {
  token: string;
  username: string;
  roles: string[];
  status: string;
};

export const authContext = createContext<AuthContextType>({
  username: "",
  token: "",
  roles: [],
  status: "",
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<userDataType>(() => {
    try {
      const saved = localStorage.getItem("userdata");
      return saved ? JSON.parse(saved) : { token: "", username: "", roles: [] };
    } catch (error) {
      console.error("Invalid userdata in localStorage:", error);
      return { token: "", username: "", roles: [] };
    }
  });

  const login = (userData: userDataType) => {
    setAuth({
      username: userData.username,
      token: userData.token,
      roles: userData.roles,
      status: userData.status,
    });
    localStorage.setItem("userdata", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth({ token: "", username: "", roles: [], status: "" });
    localStorage.removeItem("userdata");
  };

  return (
    <authContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
