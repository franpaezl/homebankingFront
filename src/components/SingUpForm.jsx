import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Estados de error para cada campo
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailBackError, setEmailBackError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordBackError, setPasswordBackError] = useState(false); // Corregido aquí

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(false); // Limpiar error al cambiar el valor
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
    setEmailBackError(false)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordBackError(false);
  };


  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones de campos vacíos
    let isValid = true;
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);

    if (!firstName) {
      setFirstNameError(true);
      isValid = false;
    }
    if (!lastName) {
      setLastNameError(true);
      isValid = false;
    }
    if (!email) {
      setEmailError(true);
      isValid = false;
    }
    if (!password) {
      setPasswordError(true);
      isValid = false;
    }

    // Validación de formato de email
    if (email && !isEmailValid(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (!isValid) return; // Si no es válido, salir de la función

    setLoading(true);

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      console.log(user);

      // Hacer la petición POST a la API
      const response = await axios.post(
        "https://homebanking-22e4.onrender.com/api/auth/register",
        user
      );
      console.log("Registration successful:", response.data);

       // Redireccionar tras el éxito
      setShowSuccessModal(true);

      // Limpiar el formulario
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const backendError = error.response.data;
      console.log(backendError);

      if (backendError.includes("Password")) {
        setPasswordBackError(true); // Corregido aquí
      } else if (backendError.includes("Email")) {
        setEmailBackError(true);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-[20px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[10px] justify-center items-center w-full"
      >
        <div className="flex flex-col w-full items-center">
          <label className="font-semibold text-gray-700" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className={`w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm ${
              firstNameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {firstNameError && (
            <p className="text-red-500 text-sm">First name is required.</p>
          )}
        </div>

        <div className="flex flex-col w-full items-center">
          <label className="font-semibold text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className={`w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm ${
              lastNameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {lastNameError && (
            <p className="text-red-500 text-sm">Last name is required.</p>
          )}
        </div>

        <div className="flex flex-col w-full items-center">
          <label className="font-semibold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="text" // Cambiado de "email" a "text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className={`w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm">
              {!isEmailValid(email)
                ? "Invalid email format."
                : "Email is required."}
            </p>
          )}
          {emailBackError && (
            <p className="text-red-500 text-sm">Email already exists</p>
          )}
        </div>

        <div className="flex flex-col w-full items-center">
          <label
            className="font-semibold text-gray-700 text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">Password is required.</p>
          )}
          {passwordBackError && ( // Corregido aquí
            <p className="text-red-500 text-sm">
              Password must be at least 8 characters long
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-1 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Client registered successfully!</h2>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
Go to the login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
