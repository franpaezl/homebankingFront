import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadClient } from "../redux/actions/clientAcction";

const SignInInput = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null); // State to store email error messages
  const [passwordError, setPasswordError] = useState(null); // State to store password error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailError(null); // Clear email error when changing the input
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setPasswordError(null); // Clear password error when changing the input
  }

  function handleSubmit(event) {
    event.preventDefault();

    let valid = true;

    // Client-side validation for email
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    }

    // Client-side validation for password
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    // If there are validation errors, stop form submission
    if (!valid) {
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
      const response = await axios.post("https://homebankingfront.onrender.com/api/auth/login", user);
      const token = response.data;

      if (token) {
        localStorage.setItem("token", token);
        console.log("Login successful, token stored");
        navigate("/account");
        dispatch(loadClient());
      } else {
        console.error("No token received");
        setEmailError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response) {
        if (error.response.status === 401) {
          // Handle unauthorized error (e.g., incorrect credentials)
          setEmailError("Invalid email or password. Please try again.");
        } else {
          // Handle other errors
          setEmailError(error.response.data);
          console.error("Error message:", error.response.data);
        }
      } else {
        // Handle unknown error
        setEmailError("An unknown error occurred. Please try again later.");
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
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        {emailError && <p className="text-red-500">{emailError}</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInInput;
