import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProfile from './UserProfile.jsx'
import InstrumentSelection from './IntrumentSelection.jsx'
import UserPublic from './UserPublic.jsx'
import UserSelection from './UserSelection.jsx'
import InstrumentTypeSelection from './InstrumentTypeSelection.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <UserProfile /> */}
    {/* <InstrumentSelection /> */}
    {/* <UserPublic /> */}
    {/* <UserSelection /> */}
    <InstrumentTypeSelection />
  </StrictMode>,
)
