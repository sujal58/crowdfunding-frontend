import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");

    if (error) {
      toast.error(decodeURIComponent(error), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }

    // Optionally redirect to login after showing error
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.search, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-semibold text-red-600">
        OAuth Login Failed. Redirecting...
      </h1>
    </div>
  );
};

export default OAuthErrorPage;
