import { Link } from 'react-router-dom';
import image from "../assets/upload_img_17452219_08_16_2024_10_54_42_474900_6983826868170718299.jpeg";
import image2 from "../assets/frnlogo.png";
import SingInInput from '../components/SingInInput';


const SingIn = () => {
  return (
    <div className='flex'>
      <img src={image} alt="Background" className='w-[60%] h-screen object-cover' />
      <div className='bg-[#93ABBF] flex flex-col justify-center items-center w-[40%] p-4'>
        <div className='w-[130px] flex flex-col items-center h-auto'>
        <img src={image2}  className=' w-[110px]' alt="Logo"  />
        <h1 className='text-center text-[13px] mt-[-2px] font-bold text-gray-800'>Federal Nation Bank</h1>
        </div>
        <SingInInput />
        <p className='text-xs'>o</p>
        <Link to="/sing-up" className='text-[#333333] underline text-[13px]'>Sing up</Link>
      </div>
    </div>
  );
};

export default SingIn;
