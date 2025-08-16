import { useForm } from "react-hook-form";
import AuthCard from "../../ui/AuthCard/AuthCard";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAndSendOtp, verifyOtp } from "@/apis/otp.api";
import type { AxiosResponse } from "axios";
import type { GetSingleResponse } from "@/types";
import { toast } from "react-toastify";
import axios from "axios";
import { forgotPassword } from "@/apis/user.api";

type forgotPass = {
  email: string;
  otp: string[];
  password: string;
};

function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<forgotPass>();

  async function onReset(data: forgotPass) {
    if (step === "email" && data.email) {
      try {
        const response: AxiosResponse<GetSingleResponse<String>> =
          await generateAndSendOtp(data.email);
        if (response.status == 200) {
          toast.success(response.data.message);
          setStep("otp");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const message = error.response.data?.data;
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
    } else if (step === "otp" && data.otp) {
      const otptest = data.otp.every((digit) => /^\d$/.test(digit));
      if (otptest) {
        const finalOtp = data.otp.join("");
        try {
          const response: AxiosResponse<GetSingleResponse<String>> =
            await verifyOtp(data.email, finalOtp);
          if (response.status == 200) {
            toast.success(response.data.message);
            setStep("password");
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            const message = error.response.data?.data;
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
      } else {
        alert("Please enter all 6 digits correctly.");
      }
    } else if (step === "password" && data.password) {
      try {
        const response: AxiosResponse<GetSingleResponse<String>> =
          await forgotPassword("forgot", data.email, data.password);
        console.log(response);
        if (response.status == 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const message = error.response.data?.data;
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
    }
  }

  function handleOtpChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const value = e.target.value;
    setValue(`otp.${index}`, value);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPressed(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key == "Backspace") {
      e.currentTarget.value = "";
      if (!e.currentTarget.value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }

  return (
    <div
      className="authPage flex  items-center justify-center"
      style={{ height: "90vh" }}
    >
      <AuthCard id="loginPage">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(onReset)}>
          {step == "email" && (
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="text"
                id="loginEmail"
                placeholder="Enter your email...."
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
          )}
          {step == "otp" && (
            <div className="form-group" style={{ gap: "1rem" }}>
              <label htmlFor="loginEmail" style={{ textAlign: "center" }}>
                Enter a 6 digit otp sent to{" "}
                {watch("email") || "your email address"}
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    {...register(`otp.${index}`, {
                      required: "All 6 digits are required",
                      pattern: {
                        value: /^[0-9]$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyPressed(e, index)}
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "24px",
                      textAlign: "center",
                      border: "2px solid #ccc",
                      borderRadius: "5px",
                    }}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                  />
                ))}
              </div>
              {errors.otp?.[0] && (
                <label
                  className="error"
                  style={{ textAlign: "center", margin: "0" }}
                >
                  {errors.otp[0].message}
                </label>
              )}
            </div>
          )}

          {step == "password" && (
            <div className="form-group">
              <label htmlFor="signupPassword">Enter a new Password:</label>
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
                <div
                  className="error"
                  style={{ textAlign: "center", margin: "0" }}
                >
                  {errors.password.message}
                </div>
              )}
            </div>
          )}
          <button type="submit" className="submit-btn" aria-label="verify otp">
            {step == "otp" ? "Verify otp" : "Submit"}
          </button>
        </form>
        <button
          className="cancel-btn"
          aria-label="cancel reset"
          onClick={() => navigate("/login")}
        >
          Cancel
        </button>
      </AuthCard>
    </div>
  );
}

export default ForgotPassword;
