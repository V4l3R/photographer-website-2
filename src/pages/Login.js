import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import validator from 'validator';
import { motion } from 'framer-motion';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';
import { useEffect } from 'react';

import http from '../common/http-common';
import bcrypt from 'bcryptjs';
import { FocusContext } from '../context/FocusContext';

const Login = () => {
 const USERNAME = 'test@test.com';
 const PASSWORD = 'test';

 const SALT = '$2a$10$4W7wNGhS/kyiouV/Dqo.vu';

 const navigate = useNavigate();

 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 const { handleSetIsAdmin, handleSetAdminUsername, handleSetAccessToken } =
  useContext(AdminContext);
 const { hideAll } = useContext(FocusContext);

 const [queryParameters] = useSearchParams();

 const [errorMessage, setErrorMessage] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [validEmail, setValidEmail] = useState(false);
 const [message, setMessage] = useState(false);
 const [name, setName] = useState(false);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [isLostPassword, setIsLostPassword] = useState(false);

 useEffect(() => {
  hideAll();

  handleSetIsAdmin(false);
  handleSetAdminUsername('');
  handleSetAccessToken('');

  return () => {};
 }, []);

 const validateEmail = (e) => {
  var email = e.target.value;

  if (validator.isEmail(email)) {
   setErrorMessage('');
   setValidEmail(true);
  } else {
   setErrorMessage("L'identifiant doit être un email");
   setSuccessMessage('');
   setValidEmail(false);
  }
 };

 function SubmitButton() {
  if (!isLostPassword) {
   if (validEmail && password !== '') {
    return (
     <button onClick={connect} className="btn">
      Connexion
     </button>
    );
   } else {
    return (
     <div style={{ opacity: 0.4 }} className="btn">
      Connexion
     </div>
    );
   }
  } else {
   if (validEmail) {
    return (
     <button onClick={recoverPassword} className="btn">
      Récupérer
     </button>
    );
   } else {
    return (
     <div style={{ opacity: 0.4 }} className="btn">
      Récupérer
     </div>
    );
   }
  }
 }

 function connect() {
  if (!validEmail || password === '') return;

  let formData = new FormData();

  formData.append('username', username);
  formData.append('password', bcrypt.hashSync(password, SALT));

  return http
   .post('/connect', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    console.log(res);
    handleSetIsAdmin(true);
    handleSetAdminUsername(username);
    handleSetAccessToken(res.data);
    setErrorMessage('');
    setSuccessMessage('Connecté !');
    navigate('/admin');
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
    setSuccessMessage('');
   });
 }

 function recoverPassword() {
  if (!validEmail) return;

  let formData = new FormData();

  formData.append('username', username);

  return http
   .post('/recoverPassword', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    console.log(res);
    setErrorMessage('');
    setSuccessMessage('Mail envoyé !');
    setIsLostPassword(false);
    // navigate("/login");
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
   });
 }

 function toggleLostPassword() {
  setUsername('');
  setPassword('');
  setErrorMessage('');
  setValidEmail(false);
  setIsLostPassword(!isLostPassword);
 }

 function handleEnter(event, func) {
  if (event.key === 'Enter') {
   func();
  }
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
    <div className="flex flex-col gap-y-4 h-[60vh] w-[50vw] pt-20">
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
       transition: transition1,
       duration: 1.9,
      }}
      className="flex flex-col items-center justify-center pb-6 h2 h-[12vh]"
     >
      Espace privé
     </motion.div>
     <div className="h-[19vh] w-full">
      {/* <form action="/" method="POST" className='flex flex-col gap-y-4'> */}
      <div className="">
       {/* <AdminConnected /> */}
       <motion.div
        initial={{
         opacity: 0,
        }}
        animate={{
         opacity: 1,
        }}
        exit={{
         opacity: 0,
        }}
        transition={{
         transition: transition1,
         duration: 2.0,
        }}
        style={{
         fontWeight: 'bold',
         color: 'green',
         textAlign: 'center',
        }}
        className={`w-full absolute left-0 -mt-6`}
       >
        {successMessage}
       </motion.div>
       <motion.div
        initial={{
         opacity: 0,
        }}
        animate={{
         opacity: 1,
        }}
        exit={{
         opacity: 0,
        }}
        transition={{
         transition: transition1,
         duration: 2.0,
        }}
        style={{
         fontWeight: 'bold',
         color: 'red',
         textAlign: 'center',
        }}
        className={`w-full absolute left-0 ${
         isLostPassword ? 'mt-2' : '-mt-6'
        }`}
       >
        {errorMessage}
       </motion.div>
       <div className="flex flex-col gap-y-4 md:px-[5vw] lg:px-[10vw] xxl:px-[15vw]">
        {!isLostPassword && (
         <>
          <motion.input
           initial={{
            opacity: 0,
           }}
           animate={{
            opacity: 1,
           }}
           exit={{
            opacity: 0,
           }}
           transition={{
            transition: transition1,
            duration: 2.1,
           }}
           type="text"
           name="identifiant"
           id="identifiant"
           placeholder="Adresse email"
           className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]"
           onKeyUp={(e) => handleEnter(e, connect)}
           onChange={(e) => setUsername(e.target.value)}
           onBlur={(e) => validateEmail(e)}
          />
          <motion.input
           initial={{
            opacity: 0,
           }}
           animate={{
            opacity: 1,
           }}
           exit={{
            opacity: 0,
           }}
           transition={{
            transition: transition1,
            duration: 2.3,
           }}
           type="password"
           name="password"
           id="password"
           placeholder="Mot de passe"
           className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]"
           onKeyUp={(e) => handleEnter(e, connect)}
           onChange={(e) => setPassword(e.target.value)}
          />
          <motion.div
           initial={{
            opacity: 0,
           }}
           animate={{
            opacity: 1,
           }}
           exit={{
            opacity: 0,
           }}
           transition={{
            transition: transition1,
            duration: 2.5,
           }}
           className="text-end cursor-pointer"
           onClick={toggleLostPassword}
          >
           Mot de passe oublié ?
          </motion.div>
         </>
        )}
        {isLostPassword && (
         <>
          <motion.input
           initial={{
            opacity: 0,
           }}
           animate={{
            opacity: 1,
           }}
           exit={{
            opacity: 0,
           }}
           transition={{
            transition: transition1,
            duration: 2.1,
           }}
           type="text"
           name="identifiant"
           id="identifiant"
           placeholder="Adresse email"
           className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 mt-8 placeholder:text-[#757879]"
           onKeyUp={(e) => handleEnter(e, recoverPassword)}
           onChange={(e) => setUsername(e.target.value)}
           onBlur={(e) => validateEmail(e)}
          />
          <motion.div
           initial={{
            opacity: 0,
           }}
           animate={{
            opacity: 1,
           }}
           exit={{
            opacity: 0,
           }}
           transition={{
            transition: transition1,
            duration: 2.5,
           }}
           className="text-end cursor-pointer"
           onClick={toggleLostPassword}
          >
           Revenir à l'écran de connexion
          </motion.div>
         </>
        )}
       </div>
      </div>
     </div>
     <div className="w-[10vw] self-center lg:ml-[20vw]">
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{
        transition: transition1,
        duration: 2.5,
       }}
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

export default Login;
