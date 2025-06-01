import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from './components/UserProfile/UserProfile.jsx'
import UserPublic from './UserPublic.jsx'
import UserSelection from './UserSelection.jsx'
import InstrumentSelection from './components/InstrumentSelection/IntrumentSelection.jsx'
import InstrumentTypeList from './components/InstrumentSelection/InstrumentTypeList.jsx'
import Login from './components/CreateProfile/Login.jsx';
import SearchForBand from './components/SearchForBand/SearchForBand.jsx';
import BandPublic from './BandPublic.jsx';
import GenreSelection from './components/GenreSelection/GenreSelection.jsx';
import GenreList from './components/GenreSelection/GenreList.jsx';
import SignUpLayout from './components/CreateProfile/SignUpLayout.jsx';
import SignUp from './components/CreateProfile/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpLayout />}>
          <Route index element={<SignUp />} />
          <Route path="/signup/userselection" element={<UserSelection />} />
          <Route path="/signup/instruments" element={<InstrumentTypeList />} />
          <Route path="/signup/instruments/:type" element={<InstrumentSelection />} />
          <Route path="/signup/genres" element={<GenreList />} />
          <Route path="/signup/genres/:type" element={<GenreSelection />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/search/bands" element={<SearchForBand />} />
        <Route path="/search/bands/bandpublic" element={<BandPublic />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
