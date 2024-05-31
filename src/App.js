
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import UserHistory from './components/UserHistory.js';
import UserHome from './components/UserHome.js';

import React from 'react';
import { useSelector } from 'react-redux';



function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <React.Fragment>

   <header>
    <Header/>
   </header>
   <main>
    <Routes>
   
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/userHistory" element={<UserHistory/>}/>
      <Route path="/userHome" element={<UserHome/>}/>

    </Routes>
   </main>
    </React.Fragment>
  );
}

export default App;
