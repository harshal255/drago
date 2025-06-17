import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loder from "../components/Loder";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(AppContext);
  // console.log("I am a private route", { isAuthenticated, loading });
  if (loading) {
    return <Loder />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
