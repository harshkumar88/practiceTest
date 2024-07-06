import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
