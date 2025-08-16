import React, { useRef, useState } from "react";

const OtpInput: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, ""); // allow only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0 && !otp[index] && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "24px",
            textAlign: "center",
            border: "2px solid #ccc",
            borderRadius: "5px",
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
