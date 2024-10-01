import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadClient, solicitLoan } from "../redux/actions/clientAcction";
import { useNavigate } from "react-router-dom";
import SuccesModal from "./SuccesModal";
import ConfirmationModal from "./ConfirmationModal"

const LoansForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const client = useSelector((store) => store.clientReducer.client);
  const clientAccounts = client?.accounts || [];
  const clientLoans = client.loans;
  const [loanType, setLoanType] = useState([]);
  const [loanSelected, setLoanSelected] = useState("");
  const [accountSelected, setAccountSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState("");

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(0);
  const [confirmationLoanData, setConfirmationLoanData] = useState(null);

  // Error state variables
  const [errors, setErrors] = useState({
    loanSelected: "",
    accountSelected: "",
    amount: "",
    selectedPayment: "",
    loanExists: "",
  });

  useEffect(() => {
    if (client.firstName === "") {
      dispatch(loadClient());

    }
    getAllLoans()
  }, [client]);

  const getAllLoans = async () => {
    try {
      const response = await axios.get("https://homebanking-22e4.onrender.com/api/loans/all/");
      setLoanType(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      alert("There was an error fetching the loans. Please try again later.");
    }
  };

  const loanNames = loanType.map((loan) => loan.name);

  const selectLoan = (e) => {
    const selectedLoanName = e.target.value;
    setLoanSelected(selectedLoanName);
    setAmount("");
    setSelectedPayment("");
    setSelectedLoanId(loanId(selectedLoanName));
    setErrors((prev) => ({ ...prev, loanSelected: "" }));
  };

  const selectAccount = (e) => {
    setAccountSelected(e.target.value);
    setErrors((prev) => ({ ...prev, accountSelected: "" }));
  };

  const inputSelectedLoan = loanType.find((loans) => loans.name === loanSelected);
  const { maxAmount = 0, payments = [] } = inputSelectedLoan || {};

  const handleAmountChange = (e) => {
    setAmount(e.target.value.replace(/\D/g, ''));
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
    setErrors((prev) => ({ ...prev, selectedPayment: "" }));
  };

  function loanId(loanName) {
    switch (loanName) {
      case "Mortgage":
        return 1;
      case "Personal":
        return 2;
      case "Automotive":
        return 3;
      default:
        return null;
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!loanSelected) newErrors.loanSelected = "Please select a loan type.";
    if (!accountSelected) newErrors.accountSelected = "Please select an account.";
    if (!amount) {
      newErrors.amount = "Please enter an amount.";
    } else if (amount > maxAmount) {
      newErrors.amount = `The amount cannot exceed the maximum of $${maxAmount}.`;
    }
    if (!selectedPayment) newErrors.selectedPayment = "Please select the number of payments.";
    if (clientLoans.some((loan) => loan.name === loanSelected)) newErrors.loanExists = "You already have this loan.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Exit if validation fails

    // Prepare loan data for confirmation
    const loanData = {
      id: selectedLoanId,
      payments: selectedPayment,
      amount: amount,
      accountNumber: accountSelected,
    };

    // Show confirmation modal
    setConfirmationLoanData(loanData);
    setShowConfirmModal(true);
  };

  const confirmLoan = () => {
    dispatch(solicitLoan(confirmationLoanData))
      .then(() => {
        dispatch(loadClient())
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        setNotificationOpacity(1);

        // Reset form fields after successful submission
        setLoanSelected("");
        setAccountSelected("");
        setAmount("");
        setSelectedPayment("");
        setSelectedLoanId("");
        setErrors({});

        // Hide success modal after 3 seconds

      })
      .catch((error) => {
        console.error("Error submitting loan:", error);
        alert("There was an error submitting the loan. Please try again.");
        setShowConfirmModal(false); // Close confirmation modal on error
      })
      ;
  };

  return (
    <div className="w-[50%] bg-[#93ABBF] py-[40px] px-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800">Loan Details</h2>

        <div className="flex flex-col">
          <label htmlFor="loan" className="font-semibold text-gray-700">Loan Type</label>
          <select name="loan" id="loan" value={loanSelected} onChange={selectLoan} className="mt-1 w-full rounded-md py-2 px-3 text-gray-900 bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="" disabled>Select a loan type</option>
            {loanNames.map((loan) => (
              <option key={loan} value={loan}>{loan}</option>
            ))}
          </select>
          {errors.loanSelected && <p className="text-red-600">{errors.loanSelected}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="account" className="font-semibold text-gray-700">Destination Account</label>
          <select name="account" id="account" value={accountSelected} onChange={selectAccount} className="mt-1 w-full rounded-md py-2 px-3 text-gray-900 bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="" disabled>Select an account</option>
            {clientAccounts.map((account) => (
              <option key={account.id} value={account.accountNumber}>{account.accountNumber}</option>
            ))}
          </select>
          {errors.accountSelected && <p className="text-red-600">{errors.accountSelected}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="amount" className="font-semibold text-gray-700">Amount</label>
          <input type="number" placeholder={`Max amount: $${maxAmount.toLocaleString()}`} id="amount" name="amount" value={Number(amount).toLocaleString()} onChange={handleAmountChange} className="mt-1 w-full rounded-md py-2 px-3 text-gray-900 bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.amount && <p className="text-red-600">{errors.amount}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="payments" className="font-semibold text-gray-700">Payments</label>
          <select id="payments" name="payments" value={selectedPayment} onChange={handlePaymentChange} className="mt-1 w-full rounded-md py-2 px-3 text-gray-900 bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="" disabled>Select number of payments</option>
            {payments.map((payment) => (
              <option key={payment} value={payment}>{payment}</option>
            ))}
          </select>
          {errors.selectedPayment && <p className="text-red-600">{errors.selectedPayment}</p>}
        </div>

        {errors.loanExists && <p className="text-red-600">{errors.loanExists}</p>}
        <button type="submit" className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400">Make a loan</button>
      </form>

      {/* Confirmation Modal */}
      {/* {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold">Confirm Loan Request</h2>
            <p>Are you sure you want to request a {loanSelected} loan of ${amount} for {selectedPayment} payments?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowConfirmModal(false)} className="mr-2 rounded-md border border-gray-300 bg-white py-1 px-4 hover:bg-gray-200">Cancel</button>
              <button onClick={confirmLoan} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Confirm</button>
            </div>
          </div>
        </div>
      )} */}
      {showConfirmModal && (<ConfirmationModal h3="Confirm Loan" p="Are you sure you want to request this loan?" cancel={() => setShowConfirmModal(false)} confirm={confirmLoan} />)}

      {/* Success Notification */}
      {showSuccessModal && (

      <SuccesModal h2="Loan approved!" navigate={() => {navigate("/account");}} textButton="Go check your accounts."/>)}
    </div>
  );
};

export default LoansForm;
