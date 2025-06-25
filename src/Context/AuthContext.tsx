import { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string;
  username: string;
  roles: string[];
  login: (userData: userDataType) => void;
  logout: () => void;
};

type userDataType = {
  token: string;
  username: string;
  roles: string[];
};

export const authContext = createContext<AuthContextType>({
  username: "",
  token: "",
  roles: [],
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<userDataType>(() => {
    const saved = localStorage.getItem("userdata");
    return saved ? JSON.parse(saved) : { token: "", username: "", roles: [] };
  });

  const login = (userData: userDataType) => {
    setAuth({
      username: userData.username,
      token: userData.token,
      roles: userData.roles,
    });
    localStorage.setItem("userdata", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth({ token: "", username: "", roles: [] });
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
