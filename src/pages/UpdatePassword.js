import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { motion } from 'framer-motion';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';

import http from '../common/http-common';
import bcrypt from 'bcryptjs';

const UpdatePassword = () => {
 // TODO: Mettre dans constantes ?
 const SALT = '$2a$10$4W7wNGhS/kyiouV/Dqo.vu';

 const navigate = useNavigate();

 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 // const { isAdmin, setIsAdmin } = useContext(AdminContext);

 const [queryParameters] = useSearchParams();

 const [errorMessage, setErrorMessage] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [isValidPasswords, setIsValidPasswords] = useState(false);

 const [newPassword1, setNewPassword1] = useState('');
 const [newPassword2, setNewPassword2] = useState('');

 const validatePasswords = () => {
  if (newPassword1 === '' || newPassword2 === '') {
   setErrorMessage('');
   return;
  }

  if (newPassword2 === newPassword1) {
   setErrorMessage('');
   setIsValidPasswords(true);
  } else {
   setErrorMessage('Les mots de passe doivent être identiques');
   setSuccessMessage('');
   setIsValidPasswords(false);
  }
 };

 function SubmitButton() {
  if (isValidPasswords) {
   return (
    <button onClick={changePassword} className="btn">
     Modifier
    </button>
   );
  } else {
   return (
    <div style={{ opacity: 0.4 }} className="btn">
     Modifier
    </div>
   );
  }
 }

 function changePassword() {
  let formData = new FormData();

  formData.append('token', queryParameters.get('t'));
  formData.append('newPassword', bcrypt.hashSync(newPassword1, SALT));

  return http
   .post('/changePassword', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    console.log(res);
    setErrorMessage('');
    setSuccessMessage('Mot de passe changé !');
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
      className="flex items-center justify-center pt-2 h2 h-[12vh]"
     >
      Nouveau mot de passe
     </motion.div>
     <div className="h-[19vh] w-full">
      {/* <form action="/" method="POST" className='flex flex-col gap-y-4'> */}
      <div className="">
       {/* <AdminConnected /> */}
       <motion.span
        exit={{ opacity: 0 }}
        transition={{ transition: transition1, duration: 1.9 }}
        style={{ fontWeight: 'bold', color: 'green', textAlign: 'center' }}
        className="w-full absolute left-0 pb-2"
       >
        {successMessage}
       </motion.span>
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ transition: transition1, duration: 3.0 }}
        style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}
        className={`w-full absolute left-0 pb-2`}
       >
        {errorMessage}
       </motion.div>
       <div className="flex flex-col gap-y-4 md:px-[5vw] lg:px-[10vw] xxl:px-[15vw]">
        <>
         <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ transition: transition1, duration: 2.3 }}
          type="password"
          name="newPass1"
          id="newPass1"
          placeholder="Nouveau mot de passe"
          className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 mt-4 placeholder:text-[#757879]"
          onChange={(e) => setNewPassword1(e.target.value)}
          onBlur={(e) => validatePasswords()}
         />
         <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ transition: transition1, duration: 2.3 }}
          type="password"
          name="newPass2"
          id="newPass2"
          placeholder="Confirmer le mot de passe"
          className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]"
          onChange={(e) => setNewPassword2(e.target.value)}
          onBlur={(e) => validatePasswords()}
         />
        </>
       </div>
      </div>
     </div>
     <div className="w-[10vw] self-center lg:ml-[20vw]">
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ transition: transition1, duration: 3 }}
       className="mt-2"
      >
       <SubmitButton />
      </motion.div>
     </div>
    </div>
   </div>
  </>
 );
};

export default UpdatePassword;
