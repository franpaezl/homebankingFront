import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountsCards from "./AccountsCards";
import { loadClient, createAccount } from "../redux/actions/clientAcction";

const AccountButtonYCards = () => {
  const dispatch = useDispatch();
  const client = useSelector((store) => store.clientReducer.client);
  const accounts = client.accounts;


  const [showModal, setShowModal] = useState(false);
  const [showMaxAccountsModal, setShowMaxAccountsModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(1);


  useEffect(() => {
    if (client.firstName == "") {
      dispatch(loadClient());

    }
  }, [client]);

  const handleCreateAccount = () => {
    if (accounts.length >= 3) {
      setShowMaxAccountsModal(true);
      return;
    }
    setShowModal(true);
  };

  const handleConfirmCreateAccount = async () => {
    setShowModal(false);
     dispatch(createAccount());
    dispatch(loadClient()); // Actualiza el estado del cliente y las cuentas
    setShowNotification(true);
    setNotificationOpacity(1);
    setTimeout(() => setNotificationOpacity(0), 5000);
    setTimeout(() => setShowNotification(false), 6000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseMaxAccountsModal = () => {
    setShowMaxAccountsModal(false);
  };

  return (
    <div className="flex w-full my-[20px]">
      <div className="flex w-[20%]">
        <button
          onClick={handleCreateAccount}
          className="h-[50px] group relative inline-flex items-center overflow-hidden rounded bg-[#023E73] px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"

        >
          Request Account

        </button>
      </div>

      <div className="flex w-[100%] gap-[50px] items-center">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountsCards
              key={account.id}
              id={account.id}
              number={account.accountNumber}
              amount={new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(account.balance)}
              date={new Date(account.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
              })}
            />
          ))
        ) : (
          <p>No accounts available.</p>
        )}
      </div>

      {showNotification && (
        <div
          className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-500"
          style={{ opacity: notificationOpacity }}
        >
          Account created successfully!
        </div>
      )}



      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to create a new account?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmCreateAccount}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showMaxAccountsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">You cannot create more than 3 accounts.</h2>
            <div className="flex justify-end">
              <button
                onClick={handleCloseMaxAccountsModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountButtonYCards;
