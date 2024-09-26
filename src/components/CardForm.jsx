import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { solicitCard, loadClient } from "../redux/actions/clientAcction";
import ConfirmationModal from "./ConfirmationModal";
import SuccesModal from "./SuccesModal";
import { useNavigate } from "react-router-dom";

const CardForm = () => {
  const [cardType, setCardType] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  // Notification states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(1);

  const client = useSelector((store) => store.clientReducer.client);
  const clientCards = client.cards || [];
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const cardRequested = {
    cardType,
    cardColor,
  };

  const requestCard = async () => {
    setLoading(true);
    try {
      await dispatch(solicitCard(cardRequested));
      dispatch(loadClient());
      setShowNotification(true);
      setNotificationOpacity(1);
      setTimeout(() => setNotificationOpacity(0), 5000);
      setTimeout(() => setShowNotification(false), 6000);
    } catch (error) {
      console.error("Failed to submit card request:", error);
      const errorMessage = error.response?.data || "An unexpected error occurred.";
      setErrorMessages({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
    setErrorMessages({}); // Reset errors on change
  };

  const handleCardColorChange = (event) => {
    setCardColor(event.target.value);
    setErrorMessages({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Validate fields
    if (!cardType) {
      errors.cardType = "Card type is required.";
    }
    if (!cardColor) {
      errors.cardColor = "Card color is required.";
    }

    const exists = clientCards.some(
      (card) => card.type === cardType.toUpperCase() && card.color === cardColor.toUpperCase()
    );

    if (exists) {
      errors.general = "You cannot have two cards of the same type and color.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    setShowConfirmModal(true);
  };

  useEffect(() => {
    if (client.firstName === "") {
      dispatch(loadClient());
    }
  }, [client]);

  return (
    <div className="w-full h-full bg-[#93ABBF] flex">
      <form className="flex flex-col gap-4 justify-center items-center w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800">Solicit Card</h2>
        <div className="flex flex-col w-full items-center">
        <label htmlFor="cardType" className="font-semibold text-gray-700">
          Select Card Type
        </label>
        <select
          name="cardType"
          id="cardType"
          className="mt-1 w-[80%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          value={cardType}
          onChange={handleCardTypeChange}
        >
          <option value="" disabled>
            Select Card Type
          </option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>
        {errorMessages.cardType && <p className="text-red-500 text-sm">{errorMessages.cardType}</p>}
        </div>

        <div className="flex flex-col w-full items-center">

        <label htmlFor="color" className="font-semibold text-gray-700">
          Select Card Color
        </label>
        <select
          name="color"
          id="color"
          className="mt-1 w-[80%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500   "
          value={cardColor}
          onChange={handleCardColorChange}
        >
          <option value="" disabled>
            Select Card Color
          </option>
          <option value="SILVER">Silver</option>
          <option value="GOLD">Gold</option>
          <option value="TITANIUM">Titanium</option>
        </select>
        {errorMessages.cardColor && <p className="text-red-500 text-sm">{errorMessages.cardColor}</p>}
        {errorMessages.general && <p className="text-red-500 text-sm">{errorMessages.general}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? "Submitting..." : "Submit Card Request"}
        </button>
      </form>

      {/* Confirm Modal */}
      {showConfirmModal && (<ConfirmationModal h3="Confirm create card" p="Are you sure you want to create this credit card?" confirm={() => { setShowConfirmModal(false); requestCard()}} cancel={() => setShowConfirmModal(false)}/>
      )}

      {/* Success Notification */}
      {showNotification && (
        <SuccesModal h2="Card application approved!" navigate={() => {navigate("/cards");}} textButton="Go check your cards."/>
      )}
    </div>
  );
};

export default CardForm;
