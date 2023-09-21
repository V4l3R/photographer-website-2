import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { motion } from 'framer-motion';

import validator from 'validator';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';

import http from '../common/http-common';
import bcrypt from 'bcryptjs';
import { FocusContext } from '../context/FocusContext';

const ResetDb = () => {
 const navigate = useNavigate();

 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 const { hideAll } = useContext(FocusContext);
 // const { isAdmin, setIsAdmin } = useContext(AdminContext);

 const [queryParameters] = useSearchParams();

 const [errorMessage, setErrorMessage] = useState('');
 const [successMessage, setSuccessMessage] = useState('');

 useEffect(() => {
  hideAll();
  resetDb();

  return () => {};
 }, []);

 function resetDb() {
  let formData = new FormData();

  formData.append('token', queryParameters.get('t'));

  return http
   .post('/proceedResetDb', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    console.log(res);
    setErrorMessage('');
    setSuccessMessage('Base de donnée réinitialisée !');
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
    setSuccessMessage('');
   });
 }

 return (
  <>
   <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={transition1}
    className="flex bg-[#eef7f9] rounded-full mx-auto w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] xxl:w-[50vw] h-[60vh] absolute bottom-0 left-0 right-0 top-[20vh] -z-10"
   />
   <div className="flex items-center justify-center h-[100vh]">
    <div
     onMouseEnter={mouseEnterHandler}
     onMouseLeave={mouseLeaveHandler}
     className="flex flex-col gap-y-4 h-[60vh] w-[50vw] pt-20"
    >
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ transition: transition1, duration: 1.9 }}
      className="flex items-center text-center justify-center pt-8 h2 h-[35vh]"
     >
      {errorMessage}
      {successMessage}
     </motion.div>
    </div>
   </div>
  </>
 );
};

export default ResetDb;
