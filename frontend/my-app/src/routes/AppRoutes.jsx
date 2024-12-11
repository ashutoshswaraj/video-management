import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";

import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
