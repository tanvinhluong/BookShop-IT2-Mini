import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Admin from "../Admin/Admin";

const AdminRouters = () => {
  const userRole = localStorage.getItem("adminroles");
  console.log(userRole);
  // Check if the role is Admin or Staff
  if (
    !userRole &&
    (!userRole?.includes("Admin") || !userRole?.includes("Staff"))
  ) {
    // if not Admin or Staff , redirect to /
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div>
      <Admin />

      <Outlet />
    </div>
  );
};

export default AdminRouters;
