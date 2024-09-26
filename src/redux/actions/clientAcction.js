import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";



// Cargar cliente
export const loadClient = createAsyncThunk("loadClient", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://homebanking-22e4.onrender.com/api/auth/current", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Unknown error");
  }
});

// Cerrar sesión
export const logOut = createAction("logOut", () => {
  localStorage.removeItem("token");
  return {};
});

// Solicitar tarjeta
export const solicitCard = createAsyncThunk("solicitCard", async (cardData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "https://homebanking-22e4.onrender.com/api/clients/current/cards",
      cardData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Unknown error");
  }
});

// Solicitar préstamo
export const solicitLoan = createAsyncThunk("solicitLoan", async (loanData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "https://homebanking-22e4.onrender.com/api/loans/",
      loanData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("prestamo solicitado");

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Unknown error");
  }
});

// Crear cuenta
export const createAccount = createAsyncThunk(
  "createAccount",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://homebanking-22e4.onrender.com/api/clients/current/accounts",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("cuenta creada");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Unknown error");
    }
  }
);

// Solicitar transacción
export const solicitTransaction = createAsyncThunk(
  "solicitTransaction",
  async (transactionData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    // const dispatch = useDispatch()

    try {
      const response = await axios.post(
        "https://homebanking-22e4.onrender.com/api/transaction/",
        transactionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // dispatch(loadClient())
      console.log("hola");

      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response ? error.response.data : "Unknown error");
    }
  }
);


