import { useEffect, useRef, useState } from "react";
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
import config from "../config";

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("token") ? true : false
  );
  const [loading, setLoading] = useState(true);
  const [wakeupServer, setWakeupServer] = useState(false);
  const backendTabRef = useRef(null);
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

  const checkServerWakeUp = async () => {
    const res = await fetch(config.server_url);
    if (res.ok) {
      console.log("server already started..");
      sessionStorage.setItem("wakeup-server", "true");
      setWakeupServer(true);
    }
  };

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

  //This line runs immediately when the component initializes — before React has a chance to fully load the browser environment or run effects. At that point, localStorage may still be undefined (especially during hydration).
  //✅ The Right Way: Delay Access with useEffect
  useEffect(() => {
    const alreadyWakeUp = sessionStorage.getItem("wakeup-server");
    let backendTab = null;

    if (!alreadyWakeUp) {
      backendTab = window.open(config.server_url, "_blank");
      if (backendTab) {
        backendTabRef.current = backendTab; // Store the reference
        checkServerWakeUp();
      }
    }
    return () => {
      if (backendTab && !backendTab.closed) {
        backendTab.close(); // Close the tab when component unmounts
      }
    };
  }, []);

  useEffect(() => {
    if (backendTabRef.current && wakeupServer) {
      const timeoutId = setTimeout(() => {
        backendTabRef.current?.close();
        backendTabRef.current = null;
      }, 3000);

      return () => {
        clearTimeout(timeoutId); // Clear timeout if effect re-runs or unmounts
      };
    }
  }, [wakeupServer]);

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
