import React, { useState, useEffect } from 'react';
import DebitCreditCard from '../components/DebitCreditCard';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from "../redux/actions/clientAcction";
import goldenVector from "../assets/goldvector.jpg";
import titaniumVector from "../assets/titaniumvector.jpg";
import blackVector from "../assets/vectoblack.jpg";

const Cards = () => {
  const client = useSelector((store) => store.clientReducer.client);
  const dispatch = useDispatch();

  const [creditCard, setCreditCard] = useState([]);
  const [debitCard, setDebitCard] = useState([]);
  useEffect(() => {
    if (client.firstName == "") {
      dispatch(loadClient());

    }
  }, [dispatch]);

  useEffect(() => {
    if (client.cards) {
      const credit = [];
      const debit = [];

      client.cards.forEach(card => {
        if (card.type === "DEBIT") {
          debit.push(card);
        } else if (card.type === "CREDIT") {
          credit.push(card);
        }
      });

      setDebitCard(debit);
      setCreditCard(credit);
    }
  }, [client.cards]);

  // Función para asignar fondo y texto basado en el color de la tarjeta
  function colorCard(card) {
    const { color } = card;

    const baseStyles = {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    switch (color) {
      case "GOLD":
        return {
          ...baseStyles,
          backgroundImage: `url(${goldenVector})`,
          textColor: 'text-black', // Texto en negro para GOLD
        };
      case "TITANIUM":
        return {
          ...baseStyles,
          backgroundImage: `url(${titaniumVector})`,
          textColor: 'text-white', // Texto en blanco para TITANIUM
        };
      case "SILVER":
        return {
          ...baseStyles,
          backgroundImage: `url(${blackVector})`,
          textColor: 'text-white', // Texto en blanco para SILVER
        };
      default:
        return {
          backgroundColor: 'gray',
          textColor: 'text-white', // Texto por defecto en blanco
        };
    }
  }

  return (
    <div className='flex flex-col w-full my-8 px-4'>
      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Credit Cards</h2>
        <div className='flex flex-wrap w-full gap-4 justify-evenly'>
          {creditCard.length > 0 ? (
            creditCard.map(card => {
              const styles = colorCard(card);
              return (
                <div className='flex flex-col w-[30%]' key={card.id}>
                  <h2 className={`text-center font-bold ${styles.textColor}`}>{card.color}</h2>
                  <DebitCreditCard
                    cardType={card.type}
                    number={card.number}
                    cvv={card.cvv}
                    thru={card.thruDate}
                    name={card.cardHolder}
                    color={styles} // Aplicar estilos de color y texto
                  />
                </div>
              );
            })
          ) : (
            <p className='text-center'>No Credit Cards Available</p>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Debit Cards</h2>
        <div className='flex flex-wrap w-full gap-4 justify-evenly'>
          {debitCard.length > 0 ? (
            debitCard.map(card => {
              const styles = colorCard(card);
              return (
                <div className='flex flex-col w-[30%]' key={card.id}>
                  <h2 className={`text-center font-bold ${styles.textColor}`}>{card.color}</h2>
                  <DebitCreditCard
                    cardType={card.type}
                    number={card.number}
                    cvv={card.cvv}
                    thru={card.thruDate}
                    name={card.cardHolder}
                    color={styles} // Aplicar estilos de color y texto
                  />
                </div>
              );
            })
          ) : (
            <p className='text-center'>No Debit Cards Available</p>
          )}
        </div>
      </div>
      <div className='flex justify-center mt-8'>
        <Link to="/solicit-card" className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400">
          Add New Card
        </Link>
      </div>
    </div>
  );
};

export default Cards;
