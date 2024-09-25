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
    setAccountSelected(event.target.value);
    setDestinationAccount("");
    setAmount(0); // Reset amount when selecting an account
  }

  function handleAmount(event) {
    setAmount(event.target.value);
  }

  function handleDescription(event) {
    setDescription(event.target.value);
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
                setDestinationAccountError(false);
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
                setDestinationAccountError(false);
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
            name="amount"
            placeholder="Enter amount"
            className={`mt-1 w-full rounded-md border ${amountError || amountExceedError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
            value={amount}
            onChange={handleAmount}
          />
          {amountError && <p className="text-red-500 text-sm">Please enter a valid amount greater than 0.</p>}
          {amountExceedError && <p className="text-red-500 text-sm">Amount exceeds the available balance.</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter transaction description"
            className={`mt-1 w-full rounded-md border ${descriptionError ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500`}
            rows="3"
            value={description}
            onChange={handleDescription}
          />
          {descriptionError && <p className="text-red-500 text-sm">Please enter a description.</p>}
        </div>

        <button type="submit" className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400">
          Submit Transaction
        </button>
      </form>

      {/* Modal Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold">Confirm Transaction</h2>
            <p className="mt-2">Are you sure you want to make this transaction?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransaction}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div
          className={`fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-md transition-opacity duration-300 ease-in-out`}
          style={{ opacity: notificationOpacity }}
        >
          Transaction successful!
        </div>
      )}
    </div>
  );
};

export default TransactionsForms;
