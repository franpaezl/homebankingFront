import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadClient, solicitTransaction } from "../redux/actions/clientAcction";

const TransactionsForms = () => {
  const dispatch = useDispatch();
  const client = useSelector((store) => store.clientReducer.client);
  const [destinationType, setDestinationType] = useState("own");
  const [accountSelected, setAccountSelected] = useState("");
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const [accountError, setAccountError] = useState(false);
  const [destinationAccountError, setDestinationAccountError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [amountExceedError, setAmountExceedError] = useState(false);

  // States for modal confirmation and success notification
  const [showModal, setShowModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(1);

  useEffect(() => {
    if (client.firstName === "") {
      dispatch(loadClient());
    }
  }, [client]);

  useEffect(() => {
    if (destinationType === "own") {
      setAvailableAccounts(
        client?.accounts?.filter(
          (account) => account.accountNumber !== accountSelected
        ) || []
      );
    } else {
      setAvailableAccounts([]); // If not "own", no available accounts
    }
  }, [destinationType, accountSelected, client]);

  function handleChange(event) {
    setDestinationType(event.target.value);
    setAccountSelected("");
    setDestinationAccount("");
  }

  function accountSelect(event) {
    const selectedAccount = event.target.value;
    setAccountSelected(selectedAccount);
    setDestinationAccount("");
    setAmount(0); // Reset amount when selecting an account
    setAccountError(false); // Clear error when changing account
  }

  function handleAmount(event) {
    const value = event.target.value;
    setAmount(value);
    setAmountError(value <= 0);
    setAmountExceedError(false); // Reset the error state
  }

  function handleDescription(event) {
    const value = event.target.value;
    setDescription(value);
    setDescriptionError(value.trim() === "");
  }

  function validateForm() {
    let isValid = true;
    setAccountError(!accountSelected);
    setDestinationAccountError(!destinationAccount);
    setAmountError(amount <= 0);
    setDescriptionError(description.trim() === "");
    setAmountExceedError(false);

    // Validate if the amount exceeds the balance of the selected account
    const selectedAccount = client.accounts.find(
      (account) => account.accountNumber === accountSelected
    );

    if (selectedAccount && amount > selectedAccount.balance) {
      setAmountExceedError(true);
      isValid = false;
    }

    if (!accountSelected || !destinationAccount || amount <= 0 || description.trim() === "") {
      isValid = false;
    }
    return isValid;
  }

  function handleConfirmTransaction() {
    const transactionData = {
      originAccount: accountSelected,
      destinationAccount: destinationAccount,
      amount: amount,
      description: description,
    };

    dispatch(solicitTransaction(transactionData));
    dispatch(loadClient());
    setShowSuccessNotification(true);
    setShowModal(false);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotificationOpacity(0);
    }, 3000);

    // Reset form values to initial state after transaction
    resetForm();
  }

  function submitTransaction(event) {
    event.preventDefault();

    // Reset errors before making the request
    setAccountError(false);
    setDestinationAccountError(false);
    setAmountError(false);
    setDescriptionError(false);
    setAmountExceedError(false);

    if (!validateForm()) return;

    // Show modal confirmation
    setShowModal(true);
  }

  // Reset form values to initial state
  function resetForm() {
    setDestinationType("own");
    setAccountSelected("");
    setAvailableAccounts([]);
    setDestinationAccount("");
    setAmount(0);
    setDescription("");

    setAccountError(false);
    setDestinationAccountError(false);
    setAmountError(false);
    setDescriptionError(false);
    setAmountExceedError(false);
  }

  useEffect(() => {
    if (showSuccessNotification) {
      resetForm(); // Reset form values when showing success notification
    }
  }, [showSuccessNotification]);

  return (
    <div className="w-[50%] bg-[#93ABBF] py-[40px]">
      <form className="flex flex-col gap-4 px-6" onSubmit={submitTransaction}>
        <h2 className="text-2xl font-bold text-gray-800">Transaction Details</h2>

        <div className="flex">
          <label className="font-semibold text-gray-700">Destination Type:</label>
          <div className="flex gap-4 ml-5">
            <label className="flex items-center gap-2 text-gray-600">
              Own
              <input
                type="radio"
                name="destinationType"
                value="own"
                checked={destinationType === "own"}
                onChange={handleChange}
                className="form-radio h-4 w-4"
              />
            </label>
            <label className="flex items-center gap-2 text-gray-600">
              Others
              <input
                type="radio"
                name="destinationType"
                value="others"
                checked={destinationType === "others"}
                onChange={handleChange}
                className="form-radio h-4 w-4"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="origen" className="font-semibold text-gray-700">Origin Account</label>
          <select
            name="origen"
            id="origen"
            onChange={accountSelect}
            value={accountSelected}
            className={`mt-1 w-full rounded-md border ${accountError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="" disabled>Select an account</option>
            {client?.accounts?.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </select>
          {accountError && <p className="text-red-500 text-sm">Please select an origin account.</p>}
        </div>

        {destinationType === "own" && accountSelected && (
          <div className="flex flex-col">
            <label htmlFor="destination" className="font-semibold text-gray-700">Destination Account</label>
            <select
              name="destination"
              id="destination"
              onChange={(e) => {
                setDestinationAccount(e.target.value);
                setDestinationAccountError(false); // Clear error when changing
              }}
              value={destinationAccount}
              className={`mt-1 w-full rounded-md border ${destinationAccountError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="" disabled>Select Destination Account</option>
              {availableAccounts.map((account) => (
                <option key={account.id} value={account.accountNumber}>
                  {account.accountNumber}
                </option>
              ))}
            </select>
            {destinationAccountError && <p className="text-red-500 text-sm">Please select a destination account.</p>}
          </div>
        )}

        {destinationType === "others" && (
          <div className="flex flex-col">
            <label htmlFor="otheraccount" className="font-semibold text-gray-700">Enter Alias or CVU</label>
            <input
              type="text"
              id="otheraccount"
              name="otheraccount"
              onChange={(e) => {
                setDestinationAccount(e.target.value);
                setDestinationAccountError(false); // Clear error when changing
              }}
              placeholder="Enter an account"
              className={`mt-1 w-full rounded-md border ${destinationAccountError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {destinationAccountError && <p className="text-red-500 text-sm">Please enter a valid account alias or CVU.</p>}
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="amount" className="font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmount}
            className={`mt-1 w-full rounded-md border ${amountError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {amountError && <p className="text-red-500 text-sm">Please enter a valid amount.</p>}
          {amountExceedError && <p className="text-red-500 text-sm">Amount exceeds available balance.</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescription}
            className={`mt-1 w-full rounded-md border ${descriptionError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {descriptionError && <p className="text-red-500 text-sm">Description cannot be empty.</p>}
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white rounded py-2">Submit</button>
      </form>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">Confirm Transaction</h3>
            <p>Are you sure you want to proceed with this transaction?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white rounded px-4 py-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 bg-green-500 text-white rounded px-4 py-2"
                onClick={handleConfirmTransaction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div  className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-500"
        style={{ opacity: notificationOpacity }}>
          Transaction completed successfully!
        </div>
      )}
    </div>
  );
};

export default TransactionsForms;
