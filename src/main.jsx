import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from './components/UserProfile/UserProfile.jsx'
import UserSelection from './components/CreateProfile/UserSelection.jsx'
import InstrumentSelection from './components/InstrumentSelection/IntrumentSelection.jsx'
import InstrumentTypeList from './components/InstrumentSelection/InstrumentTypeList.jsx'
import Login from './components/CreateProfile/Login.jsx';
import BandSearch from './components/Search/BandSearch.jsx';
import SoloSearch from './components/Search/SoloSearch.jsx'
import PublicProfile from './components/Search/PublicProfile.jsx'
import GenreSelection from './components/GenreSelection/GenreSelection.jsx';
import GenreList from './components/GenreSelection/GenreList.jsx';
import SignUpLayout from './components/CreateProfile/SignUpLayout.jsx';
import SignUp from './components/CreateProfile/SignUp.jsx';
import FinalSignUp from './components/CreateProfile/FinalSignUp.jsx';
import CreateUser from './components/CreateProfile/CreateUser.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpLayout />}>
          <Route index element={<SignUp />} />
          <Route path="/signup/userselection" element={<UserSelection />} />
          <Route path="/signup/createuser" element={<CreateUser />} />
          <Route path="/signup/instruments" element={<InstrumentTypeList />} />
          <Route path="/signup/instruments/:type" element={<InstrumentSelection />} />
          <Route path="/signup/genres" element={<GenreList />} />
          <Route path="/signup/genres/:type" element={<GenreSelection />} />
          <Route path="/signup/confirm" element={<FinalSignUp />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/search/band" element={<BandSearch />} />
        <Route path="/search/band/:userName" element={<PublicProfile />} />
        <Route path="/search/solo" element={<SoloSearch />} />
        <Route path="/search/solo/:userName" element={<PublicProfile />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
