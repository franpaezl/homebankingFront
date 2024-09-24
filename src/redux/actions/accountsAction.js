import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadClient } from "./clientAcction";

export const loadClientAccount = createAsyncThunk(
  "loadClientAccount",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/clients/current/accounts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const createAccount = createAsyncThunk(
  "createAccount",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/clients/current/accounts",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadClient()
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);
