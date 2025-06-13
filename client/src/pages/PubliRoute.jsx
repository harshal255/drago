import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

const PublicRoute = () => {
  const { token } = useContext(AppContext);
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;