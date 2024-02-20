import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import HomePage from './pages/HomePage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import DashBoardPage from './pages/DashboardPage';
import AddAlbumForm from './components/AddAlbumForm';
import AlbumDetails from './components/AlbumDetails';
import AddEventForm from './components/AddEventForm';

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<IsAnon><SignUp/></IsAnon>}/>
      <Route path="/login" element={<IsAnon><LogIn/></IsAnon>}/>
      <Route path="/dashboard" element={<IsPrivate><DashBoardPage/></IsPrivate>}/>
      <Route path="/albumform" element={<IsPrivate><AddAlbumForm/></IsPrivate>}/>
      <Route path="/albums/:albumId" element={<IsPrivate><AlbumDetails/></IsPrivate>}/>
      <Route path="/eventform" element={<IsPrivate><AddEventForm/></IsPrivate>}/>
    </Routes>
    </>
  );
}

export default App;
