import { createReducer } from "@reduxjs/toolkit";
import { loadClient, logOut, createAccount, solicitTransaction, solicitLoan, solicitCard } from "../actions/clientAcction";


const initialState = {
  client: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    accounts: [
      {
        id: 0,
        accountNumber: 0,
        balance: 0,
        creationDate: "",
        transactions: [
          {
            id: 0,
            type: "",
            amount: 0,
            description: "",
            date: "",
          },
        ],
      },
    ],
    loans: [
      {
        id: 0,
        loanId: 0,
        name: "",
        amount: 0,
        payments: 0,
      },
    ],
    cards: [
      {
        id: 0,
        cvv: 0,
        number: 0,
        fromDate: "",
        thruDate: "",
        type: "",
        color: "",
        clientHolder: "",
      },
    ],
  },
  status: "idle",
  error: null,
};

export const clientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadClient.pending, (state) => {
      state.status = "loading";
    })
    .addCase(loadClient.fulfilled, (state, action) => {
      state.client = action.payload;
      state.status = "success";
    })
    .addCase(loadClient.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(createAccount.pending, (state) => {
      state.status = "loading";
    })
    .addCase(createAccount.fulfilled, (state) => {
      state.status = "success";
    })
    .addCase(createAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(solicitTransaction.pending, (state) => {
      state.status = "loading";
    })
    .addCase(solicitTransaction.fulfilled, (state) => {
      state.status = "success";
    })
    .addCase(solicitTransaction.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(solicitLoan.pending, (state) => {
      state.status = "loading";
    })
    .addCase(solicitLoan.fulfilled, (state, action) => {

      state.status = "success";
    })
    .addCase(solicitLoan.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(solicitCard.pending, (state) => {
      state.status = "loading";
    })
    .addCase(solicitCard.fulfilled, (state, action) => {
      state.client.cards.push(action.payload); // Add the new card
      state.status = "success";
    })
    .addCase(solicitCard.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(logOut, (state) => {
      state.client = initialState.client;
    });
});