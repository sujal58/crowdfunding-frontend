import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthCard from "../../ui/AuthCard/AuthCard";
import "./auth-style.css";
import { Link, useNavigate } from "react-router-dom";
import { VscEyeClosed } from "react-icons/vsc";
import { PiEyeClosedBold } from "react-icons/pi";
import type {
  ILoginRequest,
  ILoginResponse,
} from "@/interfaces/auth.interface";
import { signIn } from "@/apis/auth.api";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "@/Context/AuthContext";

function Login({ setCurrentPage }: any) {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { token, login, roles } = useAuth();

  useEffect(() => {
    if (token && roles.includes("ROLE_USER")) {
      navigate("/user-dashboard");
    }
  }, [token, roles]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      const payload: ILoginRequest = { email_username: email, password };
      console.log(payload);

      const response: AxiosResponse<ILoginResponse> = await signIn(payload);

      if (response.status == 200) {
        if (response.data.data.roles.includes("ROLE_ADMIN")) {
          toast.warn("Only user login allowed!");
          return;
        }

        toast.success("Logged in successfully!", {
          style: { background: "#f0fdf4", color: "#22c55e" },
          onClose: () => {
            reset();
          },
        });
        login(response.data.data);
        navigate("/user-dashboard");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.data || "Request failed!";
        toast.error(message, {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      } else {
        console.log(error);
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    try {
      console.log("Initiating Google OAuth login");
      toast.success("Logged in with Google! Redirecting...", {
        style: { background: "#f0fdf4", color: "#22c55e" },
        onClose: () => {
          alert("Redirecting to user dashboard...");
        },
      });
    } catch (error) {
      toast.error("Google login failed.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
    }
  };

  return (
    <div
      className="authPage flex items-center justify-center"
      style={{ height: "90vh" }}
    >
      <AuthCard id="loginPage">
        <h1>Log In</h1>
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email or username</label>
            <input
              type="text"
              id="loginEmail"
              placeholder="Enter your email or username"
              aria-label="Email"
              {...register("email", {
                required: "Email is required",
                // pattern: {
                //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                //   message: "Please enter a valid email.",
                // },
              })}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="loginPassword">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="loginPassword"
              placeholder="Enter your password"
              aria-label="Password"
              {...register("password", {
                required: "Please enter a password.",
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "70%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <VscEyeClosed /> : <PiEyeClosedBold />}
            </span>

            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="submit-btn" aria-label="Log in">
            Log In
          </button>
          <button
            type="button"
            className="google-btn"
            id="loginGoogle"
            aria-label="Sign in with Google"
            onClick={handleGoogleLogin}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google logo" />
            Sign in with Google
          </button>
          <button
            type="button"
            className="admin-toggle-btn"
            id="toAdminLogin"
            aria-label="Login as Administrator"
            onClick={() => navigate("/admin-login")}
          >
            Login as Administrator
          </button>
        </form>
        <div className="auth-links">
          <Link to={"/forgot-password"}>Forgot password?</Link> | Don’t have an
          account?{" "}
          <Link to="/register" onClick={() => setCurrentPage("signup")}>
            Sign up
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}

export default Login;
