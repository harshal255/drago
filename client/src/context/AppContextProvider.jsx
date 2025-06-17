import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import {
  registerUser as registerUserClient,
  loginUser as loginUserClient,
} from "../api/auth";
import { userProfile as userProfileClient } from "../api/auth";
import { AppContext } from "./AppContext";
import { fetchBoards, clearBoards } from "../redux/features/boardSlice";
import { useDispatch } from "react-redux";

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("token") ? true : false
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (userData) => {
    try {
      const res = await registerUserClient(userData);
      const { message, data } = res;
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setIsAuthenticated(true);
      await userProfile();
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.log({ error });
    }
  };

  console.log({ user });

  const loginUser = async (userData) => {
    try {
      const res = await loginUserClient(userData);
      const { message, data } = res;
      console.log({ data });
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setIsAuthenticated(true);
      await userProfile();
      toast.success(message);
      // 🟢 Call board loader directly here after login
      dispatch(fetchBoards());
      navigate("/dashboard");
    } catch (error) {
      console.log({ error });
    }
  };

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    dispatch(clearBoards());
    Cookies.remove("token");
    toast.success("Logout Successfull..!");
    navigate("/");
  };

  const userProfile = async () => {
    try {
      const res = await userProfileClient();
      const { data } = res;
      setUser(data);
    } catch (error) {
      setUser(null);
      console.log({ error });
    }
  };

  console.log({ isAuthenticated });

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    const initializeAuth = async () => {
      if (!cookieToken) {
        setLoading(false);
        return;
      }
      try {
        await userProfile(); // your existing function sets user or null
        setIsAuthenticated(true);
        dispatch(fetchBoards());
      } catch (error) {
        setIsAuthenticated(false);
        Cookies.remove("token");
        console.log("Error in auth initialization:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        registerUser,
        loginUser,
        logOut,
      }}
    >
      <Navbar />
      <div className="container mx-auto w-[100dvw]">{children}</div>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
