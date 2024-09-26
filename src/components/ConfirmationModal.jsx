import React from 'react';

const ConfirmationModal = (props) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">{props.h3}</h3>
        <p>{props.p}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white rounded px-4 py-2"
            onClick={props.cancel}
          >
            Cancel
          </button>
          <button
            className="ml-2 bg-green-500 text-white rounded px-4 py-2"
            onClick={props.confirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
