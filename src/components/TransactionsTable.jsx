import React from "react";

const TransactionsTables = (props) => {

  function formatFechaHora(fecha) {
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Cambia a false si prefieres el formato 24 horas
    };

    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleString('es-ES', opciones);
}
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className={`py-2 px-4 ${props.color}`}>{props.type}</td>
      <td className="py-2 px-4 text-gray-700 text-right">{props.amount}</td>
      <td className="py-2 px-4 text-gray-700">{formatFechaHora(props.date)}</td>
      <td className="py-2 px-4 text-gray-700">{props.description}</td>
    </tr>
  );
};

export default TransactionsTables;
