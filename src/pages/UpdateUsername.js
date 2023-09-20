import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { motion } from 'framer-motion';

import validator from 'validator';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';

import http from '../common/http-common';
import bcrypt from 'bcryptjs';

const UpdateUsername = () => {
 const navigate = useNavigate();

 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 // const { isAdmin, setIsAdmin } = useContext(AdminContext);

 const [queryParameters] = useSearchParams();

 const [errorMessage, setErrorMessage] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [isValidEmail, setIsValidEmail] = useState(false);

 const [newUsername, setNewUsername] = useState('');

 const validateEmail = (email) => {
  if (validator.isEmail(email)) {
   setErrorMessage('');
   setIsValidEmail(true);
  } else {
   // setNotAdmin(false);
   setErrorMessage("L'identifiant doit être un email");
   setSuccessMessage('');
   setIsValidEmail(false);
  }
 };

 function SubmitButton() {
  if (isValidEmail) {
   return (
    <div onClick={changeUsername} className="btn">
     Modifier
    </div>
   );
  } else {
   return (
    <div style={{ opacity: 0.4 }} className="btn">
     Modifier
    </div>
   );
  }
 }

 function changeUsername() {
  let formData = new FormData();

  formData.append('token', queryParameters.get('t'));
  formData.append('newUsername', newUsername);

  return http
   .post('/changeUsername', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    console.log(res);
    setErrorMessage('');
    setSuccessMessage("Nom d'utilisateur changé !");
    navigate('/login');
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
      className="flex items-center justify-center pt-8 h2 h-[12vh]"
     >
      Nouvel email
     </motion.div>
     <div className="h-[17vh] w-full">
      {/* <form action="/" method="POST" className='flex flex-col gap-y-4'> */}
      <div className="">
       {/* <AdminConnected /> */}
       <motion.span
        exit={{ opacity: 0 }}
        transition={{ transition: transition1, duration: 1.9 }}
        style={{ fontWeight: 'bold', color: 'green', textAlign: 'center' }}
        className="w-full absolute left-0"
       >
        {successMessage}
       </motion.span>
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ transition: transition1, duration: 3.0 }}
        style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}
        className={`w-full absolute left-0`}
       >
        {errorMessage}
       </motion.div>
       <div className="flex flex-col md:px-[5vw] lg:px-[10vw] xxl:px-[15vw]">
        <motion.input
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ transition: transition1, duration: 2.3 }}
         type="text"
         name="newUsername"
         id="newUsername"
         placeholder="Nouvelle adresse email"
         className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 mt-10 placeholder:text-[#757879]"
         onChange={(e) => setNewUsername(e.target.value)}
         onBlur={(e) => validateEmail(e.target.value)}
        />
       </div>
      </div>
     </div>
     <div className="w-[10vw] self-center lg:ml-[20vw]">
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ transition: transition1, duration: 3 }}
       className=""
      >
       <SubmitButton />
      </motion.div>
     </div>
    </div>
   </div>
  </>
 );
};

export default UpdateUsername;
