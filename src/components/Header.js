import React, { useContext } from 'react';

import Socials from './Socials';
import Logo from '../img/header/MelissaChesi4.svg';
import MobileNav from './MobileNav';

import { BiExit } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { CursorContext } from '../context/CursorContext';
import { AdminContext } from '../context/AdminContext.js';
import { SettingsContext } from '../context/SettingsContext';
import { useState } from 'react';

const Header = () => {
 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);

 const { isAdmin } = useContext(AdminContext);

 const [isAboutActive, setIsAboutActive] = useState(false);
 const [isPortfolioActive, setIsPortfolioActive] = useState(false);
 const [isContactActive, setIsContactActive] = useState(false);
 const [isAdminActive, setIsAdminActive] = useState(false);

 function toggleAboutActive() {
  setIsAboutActive(true);
  setIsPortfolioActive(false);
  setIsContactActive(false);
  setIsAdminActive(false);
 }

 function togglePortfolioActive() {
  setIsPortfolioActive(true);
  setIsAboutActive(false);
  setIsContactActive(false);
  setIsAdminActive(false);
 }

 function toggleContactActive() {
  setIsPortfolioActive(false);
  setIsAboutActive(false);
  setIsContactActive(true);
  setIsAdminActive(false);
 }

 function toggleAdminActive() {
  setIsPortfolioActive(false);
  setIsAboutActive(false);
  setIsContactActive(false);
  setIsAdminActive(true);
 }

 function hideAll() {
  setIsPortfolioActive(false);
  setIsAboutActive(false);
  setIsContactActive(false);
  setIsAdminActive(false);
 }

 return (
  <header className="fixed w-full pr-[5vw] md:pr-[50px] xl:pr-[2.5vw] z-30 h-[120px] flex items-center">
   <div className="flex flex-col md:flex-row md:items-center pr-0 w-full justify-between">
    {/* Logo */}
    <Link
     onClick={hideAll}
     onMouseEnter={mouseEnterHandler}
     onMouseLeave={mouseLeaveHandler}
     to={'/'}
     className="max-w-[300px] mt-[30px] ml-[30px] mr-[30px] md:mr-0"
    >
     <img src={Logo} alt="Logo" className="mt-[-1.5em]" />
     {/* A */}
    </Link>

    <nav
     onMouseEnter={mouseEnterHandler}
     onMouseLeave={mouseLeaveHandler}
     className="hidden md:flex h-[35px] mt-3 gap-x-[6vw] md:gap-x-6 lg:gap-x-8 xl:gap-x-12 font-semibold text-lg mr-[1.5vw] xl:mr-0"
    >
     {/* <Link to={'/'} className='text-[#696c6d] hower:text-primary transition'>
          Home
        </Link> */}
     <Link
      to={'/about'}
      onClick={toggleAboutActive}
      className={`text-[#696c6d] hover:text-primary effect-underline-base ${
       isAboutActive ? 'effect-underline-active text-primary' : ''
      }`}
     >
      À propos
     </Link>
     <Link
      to={'/portfolio'}
      onClick={togglePortfolioActive}
      className={`text-[#696c6d] hover:text-primary effect-underline-base ${
       isPortfolioActive ? 'effect-underline-active text-primary' : ''
      }`}
     >
      Galerie
     </Link>
     <Link
      to={'/contact'}
      onClick={toggleContactActive}
      className={`text-[#696c6d] hover:text-primary effect-underline-base ${
       isContactActive ? 'effect-underline-active text-primary' : ''
      }`}
     >
      Contact
     </Link>
     {isAdmin && (
      <>
       <Link
        to={'/admin'}
        onClick={toggleAdminActive}
        className={`text-[#696c6d] hover:text-primary effect-underline-base ${
         isAdminActive ? 'effect-underline-active text-primary' : ''
        }`}
       >
        Admin
       </Link>
       <Link
        to={'/login'}
        onClick={hideAll}
        className={`text-[#696c6d] hover:text-primary`}
       >
        <BiExit className="" size={25} />
       </Link>
      </>
     )}
    </nav>
   </div>
   <Socials />
   <MobileNav />
  </header>
 );
};

export default Header;
