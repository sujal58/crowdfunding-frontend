import { getKycStatusByUserId } from "@/apis/user.api";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  userId: string;
  token: string;
  username: string;
  roles: string[];
  status: string;
  login: (userData: userDataType) => void;
  logout: () => void;
  refreshStatus: () => Promise<void>;
};

type userDataType = {
  userId: string;
  token: string;
  // username: string;
  roles: string[];
  status: string;
};

type stateProps = {
  userId: string;
  token: string;
  username: string;
  roles: string[];
  status: string;
};

export const authContext = createContext<AuthContextType>({
  userId: "",
  username: "",
  token: "",
  roles: [],
  status: "",
  login: () => {},
  logout: () => {},
  refreshStatus: async () => Promise.resolve(),
});

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<stateProps>(() => {
    try {
      const saved = localStorage.getItem("userdata");
      if (saved) {
        const parsed = JSON.parse(saved);
        const username = JSON.parse(atob(parsed.token.split(".")[1])).sub;
        return { ...parsed, username };
      } else {
        return {
          userId: "",
          token: "",
          username: "",
          roles: [],
          status: "",
        };
      }
    } catch (error) {
      console.error("Invalid userdata in localStorage:", error);
      return { token: "", username: "", roles: [] };
    }
  });

  const login = (userData: userDataType) => {
    const payload = JSON.parse(atob(userData.token.split(".")[1]));
    setAuth({
      userId: userData.userId,
      username: payload.sub,
      token: userData.token,
      roles: userData.roles,
      status: userData.status,
    });
    console.log(userData.token);
    localStorage.setItem("userdata", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth({ token: "", username: "", roles: [], status: "", userId: "" });
    localStorage.removeItem("userdata");
  };

  const refreshStatus = async () => {
    try {
      const res = await getKycStatusByUserId(auth.userId);
      if (res.status == 200) {
        const data = res.data.data;
        setAuth((prev) => ({
          ...prev,
          status: data.toString(),
        }));
      }
    } catch (error) {
      console.error("Failed to refresh user status", error);
    }
  };

  return (
    <authContext.Provider value={{ ...auth, login, logout, refreshStatus }}>
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
