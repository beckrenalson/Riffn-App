import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import AuthRedirector from './AuthRedirector.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import AppLayout from './components/Layout/AppLayout.jsx';


const LocationProvider = ({ children }) => {
  const location = useLocation();
  return <AnimatePresence mode='wait' initial={false}>{children(location)}</AnimatePresence>;
};

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0,
    scale: 0.95
  }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

const pageStyle = {
  position: "absolute",
  width: "100%"
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LocationProvider>
        {(location) => (
          <Routes location={location} key={location.pathname}>
            {/* Public routes (signup/login flow) - always accessible */}
            <Route path="/" element={<SignUpLayout />}> {/* Use SignUpLayout for the root path and nested signup routes */}
              <Route index element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <SignUp />
                </motion.div>
              } />
              <Route path="/login" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <Login />
                </motion.div>
              } />
              <Route path="/signup/userselection" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <UserSelection />
                </motion.div>
              } />
              <Route path="/signup/createuser" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <CreateUser />
                </motion.div>
              } />
              <Route path="/signup/instruments" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <InstrumentTypeList />
                </motion.div>
              } />
              <Route path="/signup/instruments/:type" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <InstrumentSelection />
                </motion.div>
              } />
              <Route path="/signup/genres" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <GenreList />
                </motion.div>
              } />
              <Route path="/signup/genres/:type" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <GenreSelection />
                </motion.div>
              } />
              <Route path="/signup/confirm" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <FinalSignUp />
                </motion.div>
              } />
            </Route>
            
            {/* Authenticated routes - protected by AuthRedirector */}
            <Route element={<AuthRedirector><AppLayout /></AuthRedirector>}>
              <Route path="/search/solo" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <SearchProfiles profileType="solo" />
                </motion.div>
              } />
              <Route path="/search/band" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <SearchProfiles profileType="band" />
                </motion.div>
              } />
              <Route path="/search/band/:userName" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <PublicProfile key="band" />
                </motion.div>
              } />
              <Route path="/search/solo/:userName" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <PublicProfile key="solo" />
                </motion.div>
              } />
              <Route path="/profile" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <UserProfile />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <AboutPage />
                </motion.div>
              } />
              <Route path="/settings" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <Settings />
                </motion.div>
              } />
              <Route path="/requests" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={pageStyle}
                >
                  <Connections />
                </motion.div>
              } />
            </Route>
          </Routes>
        )}
      </LocationProvider>
    </BrowserRouter>
  </StrictMode>,
)
