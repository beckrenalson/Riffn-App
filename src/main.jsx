import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import UserProfile from './UserProfile.jsx'
import UserPublic from './UserPublic.jsx'
import UserSelection from './UserSelection.jsx'
import InstrumentSelection from './IntrumentSelection.jsx'
import InstrumentTypeSelection from './InstrumentTypeList.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/instrumenttype" element={<InstrumentTypeSelection />} />
        <Route path="/instrumenttype/:type" element={<InstrumentSelection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
