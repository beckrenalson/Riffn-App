import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import UserProfile from './components/UserProfile/UserProfile.jsx'
import UserPublic from './UserPublic.jsx'
import UserSelection from './UserSelection.jsx'
import InstrumentSelection from './components/InstrumentSelection/IntrumentSelection.jsx'
import InstrumentTypeList from './components/InstrumentSelection/InstrumentTypeList.jsx'
import SignUp from './components/CreateProfile/SignUp.jsx';
import Login from './components/CreateProfile/Login.jsx';
import SearchForBand from './components/SearchForBand/SearchForBand.jsx';
import BandPublic from './BandPublic.jsx';
import GenreSelection from './components/GenreSelection/GenreSelection.jsx';
import GenreList from './components/GenreSelection/GenreList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<UserSelection />} />
        <Route path="/instruments" element={<InstrumentTypeList />} />
        <Route path="/instruments/:type" element={<InstrumentSelection />} />
        <Route path="/selectgenre" element={<GenreList />} />
        <Route path="/subgenres/:type" element={<GenreSelection />} />
        <Route path="/search/bands" element={<SearchForBand />} />
        <Route path="/search/bands/bandpublic" element={<BandPublic />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
