import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Accounts from './Pages/Accounts';
import AccountsDetails from './Pages/Account';
import Cards from './Pages/Cards';
import Loans from './Pages/Loans';
import SingIn from './Pages/SingIn';
import SingUp from './Pages/SingUp';
import SolicitCard from './Pages/SolicitCard';
import Transactions from './Pages/Transactions';
import MainLayout from './Layouts/MainLayout';
import Account from './Pages/Account';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<MainLayout/>}>
      <Route index path="/account" element = {<Accounts/>} className="accounts"/>
      <Route index path="/account/:id" element = {<Account/>} className="account"/>
      <Route index path="/cards" element = {<Cards/>} className="cards"/>
      <Route index path="/loans" element = {<Loans/>} className="loans"/>
      <Route index path="/transactions" element = {<Transactions/>} className="transaction"/>
      <Route index path="/solicit-card" element = {<SolicitCard/>} className="solicitCard"/>
      </Route>
      <Route index path="/sing-up" element = {<SingUp/>} className="singUp"/>
      <Route index path="/" element = {<SingIn/>} className="singIn"/>

    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
