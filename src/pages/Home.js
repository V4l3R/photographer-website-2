import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions'

// IMAGE //
import HomeImg from '../img/home/woman.png';

const Home = () => {

  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition1} className='section'>
      <div className='container mx-auto relative'>
        <div className='flex flex-col justify-center h-full'>
          <motion.div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} initial={{ opacity: 0, y: '-50%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-50%' }} transition={transition1} className='w-full pt-52 pb-14 lg:pt-0 lg:pb-0 lg:w-auto z-10 lg:absolute flex flex-col justify-center items-center lg:items-start'>
            <h1 className='h1'>
              Photographe <br />
              & retoucheuse
            </h1>
            <p className='text-[26px] lg:text-[36px] font-primary mb-4 lg:mb-12'>
              Paris, France
            </p>
            <Link to={'/contact'} className='btn mb-[30px]'>
              Contact
            </Link>
          </motion.div>
          <div className='flex justify-end max-h-96 max-h-max'>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={transition1} className='relative lg:-right-40 overflow-hidden'>
              <div className='relative -top-16 lg:top-0'>
                <motion.img onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} whileHover={{ scale: 1.1 }} transition={transition1} src={HomeImg} alt="Photo de photographe" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
