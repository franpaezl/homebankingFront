import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import image from "../assets/pikaso_texttoimage_35mm-film-photography-necesito-crear-una-imagen-pa.jpeg";
import AccountsCards from "../components/AccountsCards";
import TransactionsTables from "../components/TransactionsTable";
import { loadClient } from "../redux/actions/clientAcction"

const Account = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const client = useSelector((store) => store.clientReducer.client);
  console.log(client);

  const clientAccounts = client?.accounts || []; // Use optional chaining

  useEffect(() => {
    if (client.firstName == "") {
      dispatch(loadClient());

    }
  }, [dispatch]);

  const account = clientAccounts.find(acc => acc.id.toString() === id);

  if (!account) {
    return <p>Account not found</p>;
  }

  // Check if there are transactions
  const transactions = account.transactions || [];
  const hasTransactions = transactions.length > 0;

  // Formatting functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatAmountToARS = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  const transactionTypeColor = (type) => {
    switch (type) {
      case "DEBIT":
        return "text-red-500";
      case "CREDIT":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl my-[20px] text-center">
        Your selected account: {account.accountNumber}
      </h1>
      <img
        src={image}
        alt="An illustrative representation of account activities"
        className="h-[400px] w-[100%] pt-[20px] object-cover"
      />
      <div className="flex my-[20px] justify-between">
        <AccountsCards
          id={account.id}
          number={account.accountNumber}
          amount={formatAmountToARS(account.balance)}
          date={formatDate(account.creationDate)} // Fixed the field
        />
        <div className="w-[60%]">
          <h2 className="text-center text-xl font-semibold mb-4">Transactions</h2>

          {hasTransactions ? (
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md mt-4">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold">Type</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold">Amount</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold">Date</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <TransactionsTables
                    key={transaction.id}
                    color={transactionTypeColor(transaction.type)}
                    type={transaction.type}
                    amount={formatAmountToARS(transaction.amount)}
                    date={(transaction.date)}
                    description={transaction.description}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No transactions for this account.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
