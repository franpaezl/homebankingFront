import React from 'react'

const SuccesModal = (props) => {
  return (
    <div>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">{props.h2}</h2>
            <div className="flex justify-end">
              <button
                onClick={props.navigate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
{props.textButton}
              </button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default SuccesModal
