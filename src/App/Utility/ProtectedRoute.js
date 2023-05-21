/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../Stores/authStore";
import useUtilityStore from "../Stores/UtilityStore";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuthStore();
  const {isLoading,setLoading}= useUtilityStore()
  const token = localStorage.getItem("maway_token")
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {navigate('/login')};
  // }, [isLoggedIn]);

  useEffect(() => {
    let tm;
    tm = setTimeout(() => {
        !isLoggedIn && setLoading (true);
    }, 3000);

    return () => clearTimeout(tm);
}, []);

  // return <Outlet />;
  return !isLoggedIn && !token ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;


