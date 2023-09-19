import React, { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { CgMenuRight } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuVariants = {
 hidden: {
  x: '100%',
 },
 show: {
  x: 0,
  transition: {
   ease: [0.6, 0.01, -0.05, 0.9],
  },
 },
};

const MobileNav = () => {
 const [openMenu, setOpenMenu] = useState(false);

 return (
  <nav className="text-primary md:hidden">
   <div onClick={() => setOpenMenu(true)} className="text-3xl cursor-pointer">
    <CgMenuRight />
   </div>
   <motion.div
    variants={menuVariants}
    initial="hidden"
    animate={openMenu ? 'show' : ''}
    className="bg-white shadows-2x1 w-[50vw] absolute top-0 right-0 max-w-xs min-w-fit px-10 h-screen z-20"
   >
    <div
     onClick={() => setOpenMenu(false)}
     className="text-4xl absolute z-30 left-4 top-14 text-primary cursor-pointer"
    >
     <IoMdClose />
    </div>
    <ul className="h-full flex flex-col justify-center items-center gap-y-8 text-primary font-primary font-bold text-3xl">
     {/* <li><Link to='/'>Home</Link></li> */}
     <li>
      <Link to="/about">À propos</Link>
     </li>
     <li>
      <Link to="/portfolio">Galerie</Link>
     </li>
     <li>
      <Link to="/contact">Contact</Link>
     </li>
    </ul>
   </motion.div>
  </nav>
 );
};

export default MobileNav;
