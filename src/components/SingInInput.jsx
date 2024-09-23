import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadClient } from "../redux/actions/clientAcction";

const SignInInput = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setError(null); // Clear error when changing the input
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setError(null); // Clear error when changing the input
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }


    const user = {
      email: email,
      password: password,
    };

    login(user);
  }

  async function login(user) {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", user);
      const token = response.data;

      if (token) {
        localStorage.setItem("token", token);
        console.log("Login successful, token stored");
        navigate("/account");
        dispatch(loadClient());

      } else {
        console.error("No token received");
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response) {
        if (error.response.status === 401) {
          // Handle unauthorized error (e.g., incorrect credentials)
          setError("Invalid email or password. Please try again.");
        } else {
          // Handle other errors
          setError("An error occurred. Please try again later.");
          console.error("Error message:", error.response.data);
        }
      } else {
        // Handle unknown error
        setError("An unknown error occurred. Please try again later.");
      }
    }
  }


  return (
    <div className="w-full mt-[20px]">
      <form className="flex flex-col gap-[10px] justify-center items-center w-full" onSubmit={handleSubmit}>

        <label htmlFor="mail">Email</label>
        <input
          type="email"
          id="mail"
          name="mail"
          value={email}
          onChange={handleEmailChange}
          className="w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm"
        />
                {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit" // Change type to "submit"
          className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInInput;
