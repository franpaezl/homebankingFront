import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { solicitCard, loadClient } from "../redux/actions/clientAcction";

const CardForm = () => {
  const [cardType, setCardType] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const client = useSelector((store) => store.clientReducer.client);
  const clientCards = client.cards || [];
  const dispatch = useDispatch();

  const cardRequested = {
    cardType,
    cardColor,
  };

  const requestCard = async () => {
    setLoading(true);
    try {
      await dispatch(solicitCard(cardRequested));
      dispatch(loadClient())
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to submit card request:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };

  const handleCardColorChange = (event) => {
    setCardColor(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si ya existe una tarjeta del mismo tipo y color
    const exists = clientCards.some(card =>
      card.type === cardType.toUpperCase() && card.color === cardColor.toUpperCase()
    );

    if (exists) {
      setErrorMessage("You cannot have two cards of the same type and color.");
      setShowErrorModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  useEffect(() => {
    if (client.firstName == "") {
      dispatch(loadClient());

    }
  }, [dispatch]);

  return (
    <div className="w-full h-full bg-[#93ABBF] flex">
      <form
        className="flex flex-col gap-4 justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800">Solicit Card</h2>

        <label htmlFor="cardType" className="font-semibold text-gray-700">
          Select Card Type
        </label>
        <select
          name="cardType"
          id="cardType"
          className="mt-1 w-[80%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          required
          value={cardType}
          onChange={handleCardTypeChange}
        >
          <option value="" disabled>
            Select Card Type
          </option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>

        <label htmlFor="color" className="font-semibold text-gray-700">
          Select Card Color
        </label>
        <select
          name="color"
          id="color"
          className="mt-1 w-[80%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          required
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

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Submitting...' : 'Submit Card Request'}
        </button>
      </form>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to request this card?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  requestCard();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Card request submitted successfully!</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">{errorMessage}</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardForm;
