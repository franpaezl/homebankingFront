import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import image from "../assets/frnlogo.png";
import { useDispatch } from 'react-redux';
import { logOut } from "../redux/actions/clientAcction";
import { Link } from 'react-router-dom'


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);  // Controla la visibilidad del modal

  const handleLogout = () => {
    // Despacha la acción de logout y redirige
    dispatch(logOut());
    navigate("/");
  };

  const openModal = () => {
    setShowModal(true);  // Mostrar el modal
  };

  const closeModal = () => {
    setShowModal(false);  // Ocultar el modal
  };

  return (
    <header className='flex flex-row justify-evenly items-center bg-[#93ABBF]'>
      <div className="w-[8%] my-[10px] flex flex-col items-center">
      <Link to="/account">
        <img src={image} alt="Bank Icon" />
        <h1 className='text-center text-[11px] mt-[-2px] font-bold text-gray-800'>
        Federal Nation Bank
        </h1>

      </Link>
      </div>
      <Navbar />

      {/* Botón de logout que abre el modal */}
      <button onClick={openModal}>
        <i className='fa-solid fa-right-from-bracket text-2xl w-[25%]'></i>
      </button>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-end space-x-4">

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Accept
              </button>

              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;