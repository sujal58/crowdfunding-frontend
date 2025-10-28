import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/Context/AuthContext";
import { toast } from "react-toastify";

export default function OAuthSuccessHandler() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const roles = params.get("roles")?.split(",") || [];
    const status = params.get("status");

    if (token && userId && roles && status) {
      const responseData = { userId, token, roles, status };

      login(responseData);
      toast.success("Logged in with Google!", {
        style: { background: "#f0fdf4", color: "#22c55e" },
      });

      setTimeout(() => {
        navigate("/user-dashboard");
      }, 800);
    } else {
      toast.error("OAuth login failed.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg">Verifying your Google login...</p>
    </div>
  );
}
