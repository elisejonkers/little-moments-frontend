import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import AlbumEdit from './components/AlbumEdit';
import EventEdit from './components/EventEdit';

import "./styling/appXS.css"
import "./styling/appS.css"
import "./styling/appM.css"
import "./styling/appL.css"
import "./styling/appXL.css"

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
      <Route path="/albumedit/:albumId" element={<IsPrivate><AlbumEdit/></IsPrivate>}/>
      <Route path="/albums/:albumId/eventedit/:eventId" element={<IsPrivate><EventEdit/></IsPrivate>}/>
    </Routes>
    </>
  );
}

export default App;
