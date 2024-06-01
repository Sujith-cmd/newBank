
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import UserHistory from './components/UserHistory.js';
import UserHome from './components/UserHome.js';
import AdmminHome from "./components/AdminHome.js" 

import React from 'react';
import { useSelector } from 'react-redux';
import Banner from './components/Banner.js';



function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  // console.log(isLoggedIn);
  const location = useLocation()
  return (
    <React.Fragment>

{location.pathname !== '/admin' && (
        <header>
          <Header />
        </header>
      )}
   <main>
    <Routes>
   
      <Route path="/" exact element={<Banner/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/userHistory" element={<UserHistory/>}/>
      <Route path="/userHome" element={<UserHome/>}/>
      <Route path="/admin" element={<AdmminHome/>}/>

    </Routes>
   </main>
    </React.Fragment>
  );
}

export default App;
