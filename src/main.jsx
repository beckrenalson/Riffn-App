import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from './components/UserProfile/UserProfile.jsx'
import UserSelection from './components/CreateProfile/UserSelection.jsx'
import InstrumentSelection from './components/InstrumentSelection/InstrumentSelection.jsx'
import InstrumentTypeList from './components/InstrumentSelection/InstrumentTypeList.jsx'
import Login from './components/CreateProfile/Login.jsx';
import PublicProfile from './components/Search/PublicProfile.jsx'
import GenreSelection from './components/GenreSelection/GenreSelection.jsx';
import GenreList from './components/GenreSelection/GenreList.jsx';
import SignUpLayout from './components/CreateProfile/SignUpLayout.jsx';
import SignUp from './components/CreateProfile/SignUp.jsx';
import FinalSignUp from './components/CreateProfile/FinalSignUp.jsx';
import CreateUser from './components/CreateProfile/CreateUser.jsx';
import AboutPage from './components/AboutPage.jsx';
import Settings from './components/UserProfile/Settings.jsx';
import SearchProfiles from './components/Search/SearchProfiles.jsx';
import Connections from './components/Search/Connections.jsx';

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
        <Route path="/search/solo" element={<SearchProfiles profileType="solo" />} />
        <Route path="/search/band" element={<SearchProfiles profileType="band" />} />
        <Route path="/search/band/:userName" element={<PublicProfile key="band" />} />
        <Route path="/search/solo/:userName" element={<PublicProfile key="solo" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requests" element={<Connections />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
