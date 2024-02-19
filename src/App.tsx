import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import HomePage from './pages/HomePage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<IsAnon><SignUp/></IsAnon>}/>
      <Route path="/login" element={<IsAnon><LogIn/></IsAnon>}/>
    </Routes>
    </>
  );
}

export default App;
