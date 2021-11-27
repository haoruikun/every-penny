import logo from './assets/logo.svg';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import React, { useState } from 'react';
import Signup from './pages/signup';

export default function App() {
  const [ login, setLogin ] = useState(false);
  const [ signup, setSignUp ] = useState(false);
  const [ loggedInUser, setLoggedInUser ] =useState(null);

  if (signup) {
    return <Signup 
      setLogin={setLogin} 
      setSignUp={setSignUp} 
      setLoggedInUser={setLoggedInUser}/>
  } else if (login) {
    return 'Dashboard'
  } else {
    return <Login 
      setLogin={setLogin} 
      setSignUp={setSignUp} 
      setLoggedInUser={setLoggedInUser}/>
  }
}
