import AuthCard from "@/components/ui/AuthCard/AuthCard";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./auth-style.css";
import type {
  ILoginRequest,
  ILoginResponse,
} from "@/interfaces/auth.interface";
import type { AxiosResponse } from "axios";
import { signIn } from "@/apis/auth.api";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "@/Context/AuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { username, password } = data;
    try {
      const payload: ILoginRequest = { email_username: username, password };
      console.log(data);
      console.log(payload);

      const response: AxiosResponse<ILoginResponse> = await signIn(payload);

      //   localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);

      if (response.status == 200) {
        if (response.data.data.roles.includes("ROLE_ADMIN")) {
          login(response.data.data);
          toast.success("Logged in successfully!", {
            style: { background: "#f0fdf4", color: "#22c55e" },
            autoClose: 2000,
            onClose: () => {
              reset();
            },
          });
          navigate("/admin-dashboard");
        } else {
          toast.error("Only admin can login here....");
          reset();
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.data || "Invalid email or password.";
        toast.error(message, {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

  return (
    <div className="authPage flex h-screen items-center justify-center">
      <AuthCard id="Admin-login">
        <h1>Administrator Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="AdminUsername">Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
              aria-label="admin username"
              {...register("username", {
                required: "Username is required!",
              })}
            />
            {errors.username && (
              <div className="error">{errors.username.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="AdminPassword">Password</label>
            <input
              type="text"
              placeholder="Enter admin Password"
              aria-label="admin Password"
              {...register("password", {
                required: "Password is required!",
              })}
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="submit-btn" aria-label="Sign up">
            Login
          </button>
        </form>
        <div className="auth-links">
          Not admin? <Link to="/login">Regular Login</Link>
        </div>
      </AuthCard>
    </div>
  );
}

export default AdminLogin;
