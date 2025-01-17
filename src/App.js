import React, { useContext } from 'react';

import Header from './components/Header.js';
import AnimRoutes from './components/AnimRoutes.js';
import { BrowserRouter as Router } from 'react-router-dom';

import { motion } from 'framer-motion';

import { CursorContext } from './context/CursorContext.js';

const App = () => {
 const { cursorVariants, cursorBG } = useContext(CursorContext);
 const { mouseLeaveHandler } = useContext(CursorContext);
 return (
  <div onMouseEnter={mouseLeaveHandler} onMouseLeave={mouseLeaveHandler}>
   <Router>
    <Header />
    <AnimRoutes />
   </Router>
   <motion.div
    variants={cursorVariants}
    animate={cursorBG}
    className="w-[32px] h-[32px] bg-primary fixed top-0 left-0 pointer-events-none z-50 rounded-full"
   ></motion.div>
  </div>
 );
};

export default App;
