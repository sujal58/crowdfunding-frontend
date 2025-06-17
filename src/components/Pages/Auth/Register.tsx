import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthCard from "../../ui/AuthCard/AuthCard.js";
import "./auth-style.css";
import { Link } from "react-router-dom";

function Signup({ setCurrentPage }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      profilePicture: null,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(
        `Signing up: ${data.email}, Role: ${data.role}, Profile Picture:`,
        data.profilePicture
      );
      toast.success("Account created! Please log in.", {
        style: { background: "#f0fdf4", color: "#22c55e" },
        onClose: () => {
          reset();
          setCurrentPage("login");
        },
      });
    } catch (error) {
      toast.error("Email already exists.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
    }
  };

  const handleGoogleSignup = () => {
    try {
      console.log("Initiating Google OAuth signup");
      toast.success("Signed up with Google! Redirecting...", {
        style: { background: "#f0fdf4", color: "#22c55e" },
        onClose: () => {
          setCurrentPage("login");
        },
      });
    } catch (error) {
      toast.error("Google signup failed.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
    }
  };

  return (
    <div className="authPage flex items-center justify-center h-screen">
      <AuthCard id="signupPage">
        <h1>Sign Up</h1>
        <form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="signupEmail">Email</label>
            <input
              type="email"
              id="signupEmail"
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
            <label htmlFor="signupPassword">Password</label>
            <input
              type="password"
              id="signupPassword"
              placeholder="Enter your password"
              aria-label="Password"
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  (value.length >= 8 &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value)) ||
                  "Password must be at least 8 characters, with 1 uppercase and 1 number.",
              })}
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="signupConfirmPassword">Confirm Password</label>
            <input
              type="password"
              id="signupConfirmPassword"
              placeholder="Confirm your password"
              aria-label="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match.",
              })}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="signupRole">Role</label>
            <select
              id="signupRole"
              aria-label="Role"
              {...register("role", { required: "Please select a role." })}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Donor">Donor</option>
              <option value="Creator">Creator</option>
            </select>
            {errors.role && <div className="error">{errors.role.message}</div>}
          </div>
          <button type="submit" className="submit-btn" aria-label="Sign up">
            Sign Up
          </button>
          <button
            type="button"
            className="google-btn"
            id="signupGoogle"
            aria-label="Sign up with Google"
            onClick={handleGoogleSignup}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google logo" />
            Sign up with Google
          </button>
        </form>
        <div className="auth-links">
          Already have an account?{" "}
          <Link to="/login" onClick={() => setCurrentPage("login")}>
            Log in
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}

export default Signup;
