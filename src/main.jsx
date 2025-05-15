import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProfile from './UserProfile.jsx'
import InstrumentSelection from './IntrumentSelection.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProfile />
    {/* <InstrumentSelection /> */}
  </StrictMode>,
)
