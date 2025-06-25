import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to inject the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token: any = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token.jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  },
);

export const getToken = (): string | null => {
  return JSON.parse(localStorage.getItem("userDetails")!);
};

export default axiosInstance;
