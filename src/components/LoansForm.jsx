import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { solicitLoan, loadClient } from "../redux/actions/clientAcction";

const LoansForm = () => {
  const dispatch = useDispatch();
  const client = useSelector((store) => store.clientReducer.client);
  const clientAccounts = client?.accounts || [];
  const clientLoans = client.loans || [];
  const [loansType, setLoansType] = useState([]);
  const [loanSelected, setLoanSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(1);

  useEffect(() => {
    if (!client.firstName) {
      dispatch(loadClient());
    }
    getAllLoans();
  }, [dispatch, client.firstName]);

  const getAllLoans = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://homebanking-22e4.onrender.com/api/loans/all/");
      setLoansType(response.data);
    } catch (error) {
      setErrorMessage("Failed to load loan types.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const requestedLoan = loansType.find(loan => loan.name === loanSelected);
  let maxAmount = requestedLoan ? requestedLoan.maxAmount : 0;
  let payments = requestedLoan ? requestedLoan.payments : [];

  useEffect(() => {
    if (requestedLoan) {
      setSelectedPayment(payments[0] || "");
    }
  }, [loanSelected, loansType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientLoans.some(loan => loan.name === loanSelected)) {
      setErrorMessage(`This client already has a ${loanSelected} loan.`);
      setShowErrorModal(true);
      return;
    }

    if (!amount || !selectedPayment || !selectedAccount) {
      setErrorMessage("Please fill in all fields.");
      setShowErrorModal(true);
      return;
    }

    if (requestedLoan && parseFloat(amount) > maxAmount) {
      setErrorMessage(`The amount cannot exceed the maximum limit of ${maxAmount}.`);
      setShowErrorModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const submitLoanRequest = async () => {
    setLoading(true);
    setShowConfirmModal(false); // Cerrar el modal al confirmar

    const loanData = {
      id: loansType.find(loan => loan.name === loanSelected)?.id || "",
      payments: parseInt(selectedPayment),
      amount: parseFloat(amount),
      accountNumber: selectedAccount,
    };

    try {
      await dispatch(solicitLoan(loanData));
      dispatch(loadClient());
      setShowSuccessNotification(true);
      setNotificationOpacity(1);
      setTimeout(() => setNotificationOpacity(0), 5000);
      // Limpiar los campos del formulario después de la solicitud exitosa
      setAmount('');
      setSelectedPayment('');
      setSelectedAccount('');
      setLoanSelected('');
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] bg-[#93ABBF] pt-[20px] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Request a Loan</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Loan Type</label>
          <select
            value={loanSelected}
            onChange={(e) => setLoanSelected(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Select a loan</option>
            {loansType.map((loan) => (
              <option key={loan.id} value={loan.name}>{loan.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Account to Credit the Loan</label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Select an account</option>
            {clientAccounts.map(account => (
              <option key={account.id} value={account.accountNumber}>{account.accountNumber}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Payment Plan</label>
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {payments.map((payment, index) => (
              <option key={index} value={payment}>{payment} payments</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Submitting...' : 'Submit Loan Request'}
        </button>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Do you confirm the loan request?</p>
            <div className="flex justify-end">
              <button onClick={submitLoanRequest} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Confirm</button>
              <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>{errorMessage}</p>
            <div className="flex justify-end">
              <button onClick={() => setShowErrorModal(false)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessNotification && (
        <div
          className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-500"
          style={{ opacity: notificationOpacity }}
        >
          Loan requested successfully!
        </div>
      )}
    </div>
  );
};

export default LoansForm;
