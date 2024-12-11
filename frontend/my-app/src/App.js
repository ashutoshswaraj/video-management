import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar"; // Navbar imported here
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
