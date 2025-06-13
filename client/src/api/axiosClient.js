import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: `http://localhost:5000/api`,
  //   httpsAgent: false, // Disable HTTPS
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  // console.log(config);
  // Don’t attach token for login or register routes
  if (!["/user/login", "/user/register"].includes(config.url)) {
    const token = Cookies.get("token");
    if (token) {
      config.headers.token = token;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    response = response.data;
    console.log(response.status);
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    console.log("🔴 Error Intercepted:", error);

    if (status === 401) {
      toast.error(error.response?.data?.message || "Unauthorized");
    } else if (status === 422) {
      const message = error.response?.data?.error || "Validation error";
      toast.error(message);
    } else if (status === 404) {
      toast.error("Not found");
    } else {
      toast.error(error.response?.data?.message || "Unexpected error");
    }

    return Promise.reject(error); // 🔥 Important!
  }
);

export default axiosClient;
