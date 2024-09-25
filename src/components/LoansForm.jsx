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
  const [loanSelected, setLoanSelected] = useState(1);
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(1);

  // Estados para manejar los errores
  const [loanError, setLoanError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [amountExceedError, setAmountExceedError] = useState(false);
  const [loanAlreadyRequested, setLoanAlreadyRequested] = useState(false); // New state for loan request validation
  console.log(clientLoans);

  console.log(loanSelected);
  console.log(loansType);

  useEffect(() => {
    if (client.firstName === "") {
      dispatch(loadClient());
    }
    getAllLoans();
  }, [client]);

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

  const requestedLoan = loansType.find(loans => loans.id == loanSelected) || {};
  const { payments = [], maxAmount = 0 } = requestedLoan;

  useEffect(() => {
    if (requestedLoan) {
      setSelectedPayment(payments[0] || "");
    }
  }, [loanSelected, loansType]);

  function validateForm() {
    let isValid = true;
    setLoanError(!loanSelected);
    setAccountError(!selectedAccount);
    setAmountError(amount <= 0);
    setPaymentError(!selectedPayment);
    setLoanAlreadyRequested(clientLoans.some(loan => loan.id === Number(loanSelected)));
    setAmountExceedError(false);

    if (requestedLoan && amount > maxAmount) {
      setAmountExceedError(true);
      isValid = false;
    }

    if (!loanSelected || !selectedAccount || amount <= 0 || !selectedPayment || loanAlreadyRequested) {
      isValid = false;
    }

    return isValid;
  }

  function handleLoanSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      if (loanAlreadyRequested) {
        alert("You have already requested this loan."); // Alert or show error modal
      }
      return;
    }
    setShowConfirmModal(true);
  }

  console.log(typeof(loanSelected));
  console.log(amount);
  console.log(selectedPayment);
  console.log(selectedAccount);




  function handleConfirmLoan() {
    const loanData = {
      id: loanSelected,
      amount: parseFloat(amount),
      payments: parseInt(selectedPayment),
      accountNumber: selectedAccount,
    };

    dispatch(solicitLoan(loanData));
    dispatch(loadClient());

    setShowConfirmModal(false);
    setShowSuccessNotification(true);

    setTimeout(() => {
      setNotificationOpacity(0);
    }, 3000);
  }

  return (
    <div className="w-[50%] bg-[#93ABBF] py-[40px]">
      <form className="flex flex-col gap-4 px-6" onSubmit={handleLoanSubmit}>
        <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>

        <div className="flex flex-col">
          <label htmlFor="loan" className="font-semibold text-gray-700">
            Loan Type
          </label>
          <select
            name="loan"
            id="loan"
            value={loanSelected}
            onChange={(e) => {
              setLoanSelected(e.target.value);
              setLoanError(false);
            }}
            className={`mt-1 w-full rounded-md border ${loanError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="" disabled>Select a loan type</option>
            {loansType.map((loan) => (
              <option key={loan.id} value={loan.id}>
                {loan.name}
              </option>
            ))}
          </select>
          {loanError && <p className="text-red-500 text-sm">Please select a loan type.</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="account" className="font-semibold text-gray-700">
            Destination Account
          </label>
          <select
            name="account"
            id="account"
            value={selectedAccount}
            onChange={(e) => {
              setSelectedAccount(e.target.value);
              setAccountError(false);
            }}
            className={`mt-1 w-full rounded-md border ${accountError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="" disabled>Select an account</option>
            {clientAccounts.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </select>
          {accountError && <p className="text-red-500 text-sm">Please select a destination account.</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="amount" className="font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            max={maxAmount}
            placeholder={`Max amount: ${maxAmount}`}
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setAmountError(false);
            }}
            className={`mt-1 w-full rounded-md border ${amountError || amountExceedError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {amountError && <p className="text-red-500 text-sm">Please enter a valid amount greater than 0.</p>}
          {amountExceedError && <p className="text-red-500 text-sm">Amount exceeds the loan limit.</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="payments" className="font-semibold text-gray-700">Payments</label>
          <select
            id="payments"
            name="payments"
            value={selectedPayment}
            onChange={(e) => {
              setSelectedPayment(e.target.value);
              setPaymentError(false);
            }}
            className={`mt-1 w-full rounded-md border ${paymentError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="" disabled>Select number of payments</option>
            {payments.map((payment) => (
              <option key={payment} value={payment}>
                {payment}
              </option>
            ))}
          </select>
          {paymentError && <p className="text-red-500 text-sm">Please select a valid number of payments.</p>}
        </div>

        <button type="submit" className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400">
          Submit Loan
        </button>
      </form>

      {/* Modal Confirmation */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold">Confirm Loan Request</h2>
            <p>Are you sure you want to request this loan?</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleConfirmLoan} className="px-4 py-2 bg-green-500 text-white rounded-md">Confirm</button>
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className={`fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-md transition-opacity duration-500`} style={{ opacity: notificationOpacity }}>
          Loan request submitted successfully!
        </div>
      )}
    </div>
  );
};

export default LoansForm;
