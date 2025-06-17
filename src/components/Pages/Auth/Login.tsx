import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthCard from "../../ui/AuthCard/AuthCard";
import "./auth-style.css";
import { Link, useNavigate } from "react-router-dom";

function Login({ setCurrentPage }: any) {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(`Logging in: ${data.email}`);
      toast.success("Logged in successfully!", {
        style: { background: "#f0fdf4", color: "#22c55e" },
        onClose: () => {
          reset();
          alert("Redirecting to user dashboard...");
        },
      });
    } catch (error) {
      toast.error("Invalid email or password.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
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
    <div className="authPage flex items-center justify-center h-screen">
      <AuthCard id="loginPage">
        <h1>Log In</h1>
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              placeholder="Enter your email"
              aria-label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email.",
                },
              })}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              placeholder="Enter your password"
              aria-label="Password"
              {...register("password", {
                required: "Please enter a password.",
              })}
            />
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
            onClick={() => setCurrentPage("adminLogin")}
          >
            Login as Administrator
          </button>
        </form>
        <div className="auth-links">
          <a
            href="#resetRequest"
            onClick={() => setCurrentPage("resetRequest")}
          >
            Forgot password?
          </a>{" "}
          | Don’t have an account?{" "}
          <Link to="/register" onClick={() => setCurrentPage("signup")}>
            Sign up
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}

export default Login;
