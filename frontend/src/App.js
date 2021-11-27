import logo from './assets/logo.svg';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import React, { useState } from 'react';

export default function App() {
  const [ login, setLogin ] = useState(false)

  if (login) {
    return 'Hello'
  } else {
    return <Login setLogin={setLogin}/>
  }
}
