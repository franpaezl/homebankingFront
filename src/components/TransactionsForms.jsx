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

  console.log("oigin" + accountSelected);
  console.log("dest" + destinationAccount);
  console.log("am"+amount);
  console.log("desc" +description);





  function handleChange(event) {
    setDestinationType(event.target.value);
    setAccountSelected("");
    setDestinationAccount(""); // Reiniciar el destino cuando cambia el tipo
  }

  function accountSelect(event) {
    setAccountSelected(event.target.value);
  }

  function handleAmount(event) {
    setAmount(event.target.value);
  }

  function handleDescription(event) {
    setDescription(event.target.value);
  }

  function submitTransaction(event) {
    event.preventDefault();


    const transactionData = {
      originAccount: accountSelected,
      destinationAccount: destinationAccount,
      amount: amount,
      description: description,

    };

    console.log(transactionData);

    dispatch(solicitTransaction(transactionData));
  }

  useEffect(() => {
    if (destinationType === "own") {
      setAvailableAccounts(
        client?.accounts?.filter(
          (account) => account.accountNumber !== accountSelected
        ) || []
      );
    } else {
      setAvailableAccounts([]);
    }
  }, [destinationType, accountSelected, client]);

  useEffect(() => {
    if (!client.firstName) {
      dispatch(loadClient());
    }
  }, [dispatch, client.firstName]);

  return (
    <div className="w-[50%] bg-[#93ABBF] pt-[20px]">
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
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Select an account</option>
            {client?.accounts?.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </select>
        </div>

        {destinationType === "own" && accountSelected && (
          <div className="flex flex-col">
            <label htmlFor="destination" className="font-semibold text-gray-700">Destination Account</label>
            <select
              name="destination"
              id="destination"
              onChange={(e) => setDestinationAccount(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>Select an account</option>
              {availableAccounts.map((account) => (
                <option key={account.id} value={account.accountNumber}>
                  {account.accountNumber}
                </option>
              ))}
            </select>
          </div>
        )}

        {destinationType === "others" && (
          <div className="flex flex-col">
            <label htmlFor="otheraccount" className="font-semibold text-gray-700">Enter Alias or CVU</label>
            <input
              type="text"
              id="otheraccount"
              name="otheraccount"
              onChange={(e) => setDestinationAccount(e.target.value)}
              placeholder="Enter an account"
              className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="amount" className="font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            value={amount}
            onChange={handleAmount}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter transaction description"
            className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
            value={description}
            onChange={handleDescription}
            required
          />
        </div>

        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionsForms;
