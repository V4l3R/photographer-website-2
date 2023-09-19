import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import validator from 'validator';
import { motion } from 'framer-motion';

import http from '../common/http-common';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';

// IMAGE //
import ContactImg from '../img/contact/woman.png';

const Contact = () => {
 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 const [queryParameters] = useSearchParams();

 const [errorMessage, setErrorMessage] = useState('');
 const [sendedMessage, setSendedMessage] = useState('Message envoyé !');
 const [validEmail, setValidEmail] = useState(false);
 const [message, setMessage] = useState('');
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [isMessageSended, setIsMessageSended] = useState(false);

 const messageSended = queryParameters.get('success') === 'true' ? true : false;

 const validateEmail = (e) => {
  var email = e.target.value;

  if (validator.isEmail(email)) {
   setErrorMessage('');
   setValidEmail(true);
  } else {
   deleteMessageSended();
   setErrorMessage("Entrez un email valide s'il vous plait");
   setValidEmail(false);
  }
 };

 function deleteMessageSended() {
  setSendedMessage('');
 }

 function SubmitButton() {
  if (name && validEmail && message) {
   return (
    <button
     onClick={sendMail}
     className="btn mb-[30px] mt-8 mx-auto lg:mx-0 self-start"
    >
     Envoyer
    </button>
   );
  } else {
   return (
    <div
     style={{ opacity: 0.4 }}
     className="btn mb-[30px] mt-8 mx-auto lg:mx-0 self-start"
    >
     Envoyer
    </div>
   );
  }
 }

 function MessageSended() {
  if (isMessageSended) {
   return (
    <span
     style={{ fontWeight: 'bold', color: 'green', textAlign: 'center' }}
     className="mb-[-10px]"
    >
     {sendedMessage}
    </span>
   );
  }
 }

 function sendMail() {
  let formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  return http
   .post('/sendMail', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    console.log(res);
    setErrorMessage('');
    // setSuccessMessage("Connecté !")
    setIsMessageSended(true);
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
    // setSuccessMessage("");
    setIsMessageSended(false);
    // setNotConnectedMessage("Identifiants incorrects");
    // setNotAdmin(true);
   });
 }

 return (
  <>
   <motion.section
    initial={{ opacity: 0, y: '100%' }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: '100%' }}
    transition={transition1}
    className="section bg-white"
   >
    <div className="container mx-auto h-full">
     <div className="flex flex-col lg:flex-row h-full items-center justify-start pt-36 gap-x-8 text-center lg:text-left">
      <motion.div
       initial={{ opacity: 0, y: '100%' }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: '100%' }}
       transition={transition1}
       className="hidden lg:flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-72 -z-10"
      />
      <div
       onMouseEnter={mouseEnterHandler}
       onMouseLeave={mouseLeaveHandler}
       className="lg:flex-1 lg:pt-32 px-4"
      >
       <h1 className="h1">Contact</h1>
       <p className="mb-4 pl-2">Contactez-moi pour plus de détails</p>
       {/* <form action="https://formsubmit.co/triforce4@hotmail.com" method="POST" className='flex flex-col gap-y-4'> */}
       <div className="flex flex-col gap-y-4">
        <span
         style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}
         className="mt-0 mb-[-14px]"
        >
         {errorMessage}
        </span>
        <div className="flex flex-col sm:flex-row gap-x-10">
         <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]"
          onChange={(e) => setName(e.target.value)}
         />
         <input
          type="hidden"
          name="_next"
          value="http://localhost:3000/contact?success=true"
         ></input>
         <input
          type="text"
          name="email"
          id="userEmail"
          placeholder="Votre adresse email"
          className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => validateEmail(e)}
         ></input>
        </div>
        <textarea
         type="text"
         name="message"
         placeholder="Votre message"
         className="outline-none border-b border-b-primary h-[40px] mt-2 bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] max-h-40"
         onChange={(e) => setMessage(e.target.value)}
        />
        <input type="hidden" name="_captcha" value="false"></input>
        <MessageSended />
        <SubmitButton />
       </div>
      </div>
      <motion.div
       initial={{ opacity: 0, y: '100%' }}
       animate={{ opacity: 1, y: '52%' }}
       exit={{ opacity: 0, y: '100%' }}
       transition={transition1}
       className="hidden lg:hidden sm:flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-80 -z-10"
      />
      <motion.div
       initial={{ opacity: 0, y: '100%' }}
       animate={{ opacity: 1, y: '61%' }}
       exit={{ opacity: 0, y: '100%' }}
       transition={transition1}
       className="sm:hidden flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-80 -z-10"
      />
      <motion.div
       initial={{ opacity: 0, y: '100%' }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: '100%' }}
       transition={{ transition: transition1, duration: 1.5 }}
       onMouseEnter={mouseEnterHandler}
       onMouseLeave={mouseLeaveHandler}
       className="lg:flex-1"
      >
       <img src={ContactImg} alt="" />
      </motion.div>
     </div>
    </div>
   </motion.section>
  </>
 );
};

export default Contact;
