import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  // LoginSignup.js
  const handleSubmit = async () => {
    try {
      let response;
      if (isSignup) {
        response = await axios.post("http://localhost:8000/auth/signup", {
          email,
          password,
          name,
        });
        if (response?.data?.success) {
          // Save the user data, including the user ID, to local storage or session storage
          localStorage.setItem("user", JSON.stringify(response?.data?.newUser));
          setUser(response?.data?.newUser);
          navigate("/home");
        } else {
          alert(response?.data?.message || "An error occurred");
        }
      } else {
        response = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
        });
        if (response?.data?.success) {
          // Save the user data, including the user ID, to local storage or session storage
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          setUser(response?.data?.user);
          navigate("/home");
        } else {
          alert(response?.data?.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>{isSignup ? "Sign Up" : "Login"}</button>
      <button onClick={toggleSignup}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Login;
