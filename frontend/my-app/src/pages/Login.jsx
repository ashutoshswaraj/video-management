import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Include the toast styles
import "../assets/styles/login.css";
const Login = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };
  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="form">
          <form className="login-form">
            <input type="text" name="" id="" placeholder="username" />
            <input type="password" name="" id="" placeholder="password" />
            <button>Login</button>
            <p className="message">
              Not Registerd? <a href="#">Create an account</a>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

// import React from "react";

// const Login = () => {
//   const loginWithGoogle = () => {
//     window.open("http://localhost:5000/auth/google", "_self");
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <button onClick={loginWithGoogle}>Sign in with Google</button>
//     </div>
//   );
// };

// export default Login;
