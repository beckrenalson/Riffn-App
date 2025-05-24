import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import UserProfile from './components/UserProfile/UserProfile.jsx'
import UserPublic from './UserPublic.jsx'
import UserSelection from './UserSelection.jsx'
import InstrumentSelection from './components/InstrumentSelection/IntrumentSelection.jsx'
import InstrumentTypeList from './components/InstrumentTypeList/InstrumentTypeList.jsx'
import SignUp from './components/CreateProfile/SignUp.jsx';
import Login from './components/CreateProfile/Login.jsx';
import SearchForBand from './components/SearchForBand/SearchForBand.jsx';
import BandPublic from './BandPublic.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchForBand />} />
        {/* <Route path="/" element={<SignUp />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/userselection" element={<UserSelection />} />
        <Route path="/selectinstrument" element={<InstrumentTypeList />} />
        <Route path="/selectinstrument/:type" element={<InstrumentSelection />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchForBand />} />
        <Route path="/bandpublic" element={<BandPublic />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
