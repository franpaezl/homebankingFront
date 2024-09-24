import { useEffect } from "react";
import image from "../assets/pikaso_texttoimage_35mm-film-photography-necesito-crear-una-imagen-pa.jpeg";
import AccountButtonYCards from '../components/AccountButtonYCards';
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from "../redux/actions/clientAcction";

const Accounts = () => {
  const client = useSelector((store) => store.clientReducer.client);
  const dispatch = useDispatch();

  useEffect(() => {
    if (client.firstName == "") {
      dispatch(loadClient());

    }
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center pt-[20px]">
      {client && client.firstName && (
        <h1 className="text-4xl font-bold">¡Welcome {client.firstName}!</h1>
      )}

      <img
        src={image}
        alt="homeb-img"
        className="h-[400px] w-[100%] pt-[20px] object-cover"
      />
      <AccountButtonYCards />
    </div>
  );
};

export default Accounts;
