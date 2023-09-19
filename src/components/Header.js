import React, { useContext } from 'react';

import Socials from './Socials';
import Logo from '../img/header/MelissaChesi4.svg';
import MobileNav from './MobileNav';

import { BiExit } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { CursorContext } from '../context/CursorContext';
import { AdminContext } from '../context/AdminContext.js';
import { SettingsContext } from '../context/SettingsContext';

const Header = () => {

  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);

  const { isAdmin } = useContext(AdminContext);

  return (
    <header className='fixed w-full pr-[5vw] md:pr-[50px] xl:pr-[2.5vw] z-30 h-[120px] flex items-center'>
      <div className='flex flex-col md:flex-row md:items-center pr-0 w-full justify-between'>
        { /* Logo */}
        <Link onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} to={'/'} className='max-w-[300px] mt-[30px] ml-[30px] mr-[30px] md:mr-0'>
          <img src={Logo} alt='Logo' className='mt-[-1.5em]' />
          {/* A */}
        </Link>

        <nav onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='hidden md:flex gap-x-[6vw] md:gap-x-6 lg:gap-x-8 xl:gap-x-12 font-semibold text-lg mr-[1.5vw] xl:mr-0'>
          {/* <Link to={'/'} className='text-[#696c6d] hower:text-primary transition'>
          Home
        </Link> */}
          <Link to={'/about'} className='text-[#696c6d] hower:text-primary transition'>
            À propos
          </Link>
          <Link to={'/portfolio'} className='text-[#696c6d] hower:text-primary transition'>
            Galerie
          </Link>
          <Link to={'/contact'} className='text-[#696c6d] hower:text-primary transition'>
            Contact
          </Link>
          {isAdmin &&
            <>
              <Link to={'/admin'} className='text-[#696c6d] hower:text-primary transition'>
                Admin
              </Link>
              <Link to={'/login'} className='text-[#696c6d] hower:text-primary transition'>
                <BiExit className='' size={25} />
              </Link>
            </>
          }
        </nav>
      </div>
      <Socials />
      <MobileNav />
    </header >
  );
};

export default Header;
