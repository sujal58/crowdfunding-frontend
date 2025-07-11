import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthCard from "../../ui/AuthCard/AuthCard.js";
import "./auth-style.css";
import { Link } from "react-router-dom";
import { signup } from "@/apis/auth.api.js";
import type { ISignupRequest } from "@/interfaces/auth.interface.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup({ setCurrentPage }: any) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      // confirmPassword: "",
      roles: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { confirmPassword, ...remain } = data;
    try {
      const payload: ISignupRequest = {
        ...remain,
        roles: [remain.roles],
      };

      const response = await signup(payload);
      console.log(response);
      if (response.status == 200) {
        toast.success("Registered Successfully!", {
          style: { background: "#f0fdf4", color: "#22c55e" },
          autoClose: 2000,
          onClose: () => {
            reset();
            setCurrentPage("login");
          },
        });
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.data || "Registration Failed!", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
        console.log(error.response.data);
      } else {
        toast.error("Registration Failed!", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
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
            <label htmlFor="signupName">Name</label>
            <input
              type="text"
              id="signupName"
              placeholder="Enter your full name"
              aria-label="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && <div className="error">{errors.name.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="signupName">Username</label>
            <input
              type="text"
              id="signupUsername"
              placeholder="Enter your Username"
              aria-label="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <div className="error">{errors.username.message}</div>
            )}
          </div>
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
            <label htmlFor="signupRole">Role</label>
            <select
              id="signupRole"
              aria-label="Role"
              {...register("roles", { required: "Please select a role." })}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Donor">Donor</option>
              <option value="Creator">Creator</option>
            </select>
            {errors.roles && (
              <div className="error">{errors.roles.message}</div>
            )}
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
