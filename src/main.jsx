import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import UserProfile from './UserProfile.jsx'
import UserPublic from './UserPublic.jsx'
import UserSelection from './UserSelection.jsx'
import InstrumentSelection from './IntrumentSelection.jsx'
import InstrumentTypeSelection from './InstrumentTypeSelection.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InstrumentTypeSelection />} />
        <Route path="/InstrumentSelection" element={<InstrumentSelection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
