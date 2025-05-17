import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProfile from './UserProfile.jsx'
import InstrumentSelection from './IntrumentSelection.jsx'
import UserPublic from './UserPublic.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProfile />
    {/* <InstrumentSelection /> */}
    {/* <UserPublic /> */}
  </StrictMode>,
)
