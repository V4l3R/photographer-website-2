import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';

// IMAGE //
import AboutImg from '../img/about/woman.png';
import { FocusContext } from '../context/FocusContext';

const About = () => {
 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 const { toggleAboutActive } = useContext(FocusContext);

 useEffect(() => {
  toggleAboutActive();

  return () => {};
 }, []);

 return (
  <motion.section
   initial={{ opacity: 0, y: '100%' }}
   animate={{ opacity: 1, y: 0 }}
   exit={{ opacity: 0, y: '100%' }}
   transition={transition1}
   className="section"
  >
   <div
    onMouseEnter={mouseEnterHandler}
    onMouseLeave={mouseLeaveHandler}
    className="container mx-auto h-full relative"
   >
    <div className="flex flex-col lg:flex-row h-full items-center justify-center gap-x-24 text-center lg:text-left lg:pt-16">
     <div className="flex-1 max-h-96 lg:max-h-max order-2 lg:order-none overflow-hidden">
      <img src={AboutImg} alt="" />
     </div>
     <motion.div
      initial={{ opacity: 0, y: '-80%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-80%' }}
      transition={transition1}
      className="flex-1 pt-36 pb-14 lg:pt-0 lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start"
     >
      <h1 className="h1 normal-case">À propos</h1>
      <p className="mb-12 max-w-sm">
       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, fugit
       sit quam reiciendis veniam, modi quis dolorem necessitatibus minus ipsum
       Aa ratione, possimus facilis? Eaque totam dignissimos enim repellendus
       at?
       <br />
       <br />
       Nostrum magnam totam tempora enim dolorem quisquam cupiditate tenetur.
       Cumque veritatis.
      </p>
      <Link to={'/portfolio'} className="btn">
       Mes créations
      </Link>
     </motion.div>
    </div>
   </div>
  </motion.section>
 );
};

export default About;
