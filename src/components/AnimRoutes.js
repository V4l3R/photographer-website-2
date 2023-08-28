import React from 'react';

import Home from '../pages/Home';
import About from '../pages/About';
import Portfolio from '../pages/Portfolio';
import Contact from '../pages/Contact';
import Login from '../pages/Login';

import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Admin from '../pages/Admin';


const AnimRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence initial={true} mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
