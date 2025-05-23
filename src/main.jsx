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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userselection" element={<UserSelection />} />
        <Route path="/selectinstrument" element={<InstrumentTypeList />} />
        <Route path="/selectinstrument/:type" element={<InstrumentSelection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
