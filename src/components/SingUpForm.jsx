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
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setError(null);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setError(null);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(null);
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones de campos vacíos
    if (!firstName) {
      setError("First name is required.");
      return;
    }
    if (!lastName) {
      setError("Last name is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    // Validación de formato de email
    if (!isEmailValid(email)) {
      setError("Invalid email format.");
      return;
    }

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

      navigate("/"); // Redireccionar tras el éxito
      setShowSuccessModal(true);

      // Limpiar el formulario
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Mostrar errores del backend
      const backendError = error.response.data;
      console.error("Error during registration:", backendError);
      setError(backendError); // Aquí mostramos el error del backend si existe
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
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          className="w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          className="w-[80%] rounded-md border-black py-1.5 pe-10 shadow-sm sm:text-sm"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
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
          type="submit"
          className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
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
                  navigate("/login");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
