import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import Loder from "../components/Loder";

const PrivateRoute = () => {
  const { token, loading } = useContext(AppContext);
  console.log("I am a private route", { token, loading });
  if (loading) {
    return <Loder />;
  }

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
