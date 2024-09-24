import { createReducer } from "@reduxjs/toolkit";
import { loadClientAccount, createAccount } from "../actions/accountsAction";

const initialState = {
  accounts: [],
  status: "idle",
  error: null,
};


export const accountsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadClientAccount.pending, (state) => {
      state.status = "loading";
    })
    .addCase(loadClientAccount.fulfilled, (state, action) => {
      state.accounts = action.payload; // Asignar las cuentas recibidas
      state.status = "success";
      state.error = null; // Resetear error al cargar correctamente
    })
    .addCase(loadClientAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(createAccount.pending, (state) => {
      state.status = "loading";
    })
    .addCase(createAccount.fulfilled, (state, action) => {
      state.accounts.push(action.payload); // Añadir nueva cuenta
      state.status = "success";
      state.error = null; // Resetear error al crear correctamente
    })
    .addCase(createAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
});
