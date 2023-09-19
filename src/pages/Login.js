import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import validator from "validator";
import { motion } from 'framer-motion';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';
import { useEffect } from 'react';

import http from "../common/http-common";
import bcrypt from 'bcryptjs'

const Login = () => {

  const USERNAME = "test@test.com";
  const PASSWORD = "test";

  const SALT = "$2a$10$4W7wNGhS/kyiouV/Dqo.vu";

  const navigate = useNavigate();

  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const [queryParameters] = useSearchParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [notConnectedMessage, setNotConnectedMessage] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState(false);
  const [name, setName] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notAdmin, setNotAdmin] = useState(false);
  const [isLostPassword, setIsLostPassword] = useState(false);


  useEffect(() => {

    setIsAdmin(false);

    return () => {
    }

  }, [])


  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setErrorMessage("");
      setValidEmail(true);
    } else {
      setNotAdmin(false);
      setErrorMessage("L'identifiant doit être un email");
      setSuccessMessage("");
      setValidEmail(false);
    }
  };

  function SubmitButton() {
    if (!isLostPassword) {
      if (validEmail && password !== "") {
        return <button onClick={connect} className='btn'>Connexion</button>
      } else {
        return <div style={{ opacity: 0.4 }} className='btn'>Connexion</div>
      };
    } else {
      if (validEmail) {
        return <button onClick={recoverPassword} className='btn'>Récupérer</button>
      } else {
        return <div style={{ opacity: 0.4 }} className='btn'>Récupérer</div>
      };
    }
  };

  function connect() {
    
    if(!validEmail || password === "") return;

    let formData = new FormData();

    formData.append("username", username);
    formData.append("password", bcrypt.hashSync(password, SALT));

    return http.post("/connect", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setNotAdmin(false);
        setIsAdmin(true);
        setErrorMessage("");
        setSuccessMessage("Connecté !")
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
        setSuccessMessage("");
        // setNotConnectedMessage("Identifiants incorrects");
        setNotAdmin(true);
      })

  }

  function recoverPassword() {

    if(!validEmail) return;

    let formData = new FormData();

    formData.append("username", username);

    return http.post("/recoverPassword", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        // setNotAdmin(false);
        // setIsAdmin(true);
        // setErrorMessage("");
        setSuccessMessage("Mail envoyé !")
        setIsLostPassword(false);
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
        // setConnectedMessage("");
        // setNotConnectedMessage("Identifiants incorrects");
        // setNotAdmin(true);
      })

  }

  function AdminConnected() {
    if (isAdmin) {
      return <motion.span exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 1.9 }} style={{ fontWeight: "bold", color: "green", textAlign: "center" }} className='w-full absolute left-0 -mt-6' >{successMessage}</motion.span>
    } else if (notAdmin) {
      return <span style={{ fontWeight: "bold", color: "red", textAlign: "center" }} className='w-full absolute left-0 -mt-6' >{notConnectedMessage}</span>
    }
  }

  function toggleLostPassword() {
    setUsername("");
    setPassword("");
    setErrorMessage("");
    setValidEmail(false);
    setIsLostPassword(!isLostPassword);
  }

  function handleEnter(event, func) {
    if (event.key === "Enter") {
      func()
    }
  }

  return (
    <>
      {/* <motion.section initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={transition1} className='section bg-white'>
        <div className='container mx-auto h-full'>
          <div className='flex flex-col lg:flex-row h-full items-center justify-start pt-36 gap-x-8 text-center lg:text-left'>
            <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={transition1} className='hidden lg:flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-72 -z-10' />
            <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='lg:flex-1 lg:pt-32 px-4'>
              <h1 className='h1'>Contact</h1>
              <p className='mb-4 pl-2'>Contactez-moi pour plus de détails</p>
              <form action="https://formsubmit.co/triforce4@hotmail.com" method="POST" className='flex flex-col gap-y-4'>
                <span style={{ fontWeight: "bold", color: "red", textAlign: "center" }} className='mt-0 mb-[-14px]' >{errorMessage}</span>
                <div className='flex flex-col sm:flex-row gap-x-10'>
                  <input type="text" name="nom" placeholder='Votre nom' className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]' onChange={e => setName(e.target.value)} />
                  <input type="hidden" name="_next" value="http://localhost:3000/contact?success=true"></input>
                  <input type="text" name="email" id="userEmail" placeholder='Votre adresse email' className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]' onBlur={(e) => validateEmail(e)}></input>
                </div>
                <textarea type="text" name="message" placeholder='Votre message' className='outline-none border-b border-b-primary h-[40px] mt-2 bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] max-h-40' onChange={e => setMessage(e.target.value)} />
                <input type="hidden" name="_captcha" value="false"></input>
                <MessageSended />
                <SubmitButton />
              </form>
            </div>
            <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: '52%' }} exit={{ opacity: 0, y: '100%' }} transition={transition1} className='hidden lg:hidden sm:flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-80 -z-10' />
            <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: '61%' }} exit={{ opacity: 0, y: '100%' }} transition={transition1} className='sm:hidden flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-80 -z-10' />
            <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ transition: transition1, duration: 1.5 }} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='lg:flex-1'>
              <img src={ContactImg} alt='' />
            </motion.div>
          </div>
        </div>
      </motion.section> */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition1} className='flex bg-[#eef7f9] rounded-full mx-auto w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] xxl:w-[50vw] h-[60vh] absolute bottom-0 left-0 right-0 top-[20vh] -z-10' />
      <div className='flex items-center justify-center h-[100vh]'>
        <div className='flex flex-col gap-y-4 h-[60vh] w-[50vw] pt-20'>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 1.9 }} className='flex flex-col items-center justify-center pb-6 h2 h-[12vh]'>
            Espace privé
          </motion.div>
          <div className='h-[19vh] w-full'>
            {/* <form action="/" method="POST" className='flex flex-col gap-y-4'> */}
            <div className=''>
              <AdminConnected />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 3.0 }} style={{ fontWeight: "bold", color: "red", textAlign: "center" }} className={`w-full absolute left-0 ${isLostPassword ? 'mt-2' : '-mt-6'}`} >{errorMessage}</motion.div>
              <div className='flex flex-col gap-y-4 md:px-[5vw] lg:px-[10vw] xxl:px-[15vw]'>
                {!isLostPassword &&
                  <>
                    <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 2.3 }} type="text" name="identifiant" id="identifiant" placeholder='Adresse email' className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]' onKeyUp={e => handleEnter(e, connect)} onChange={e => setUsername(e.target.value)} onBlur={(e) => validateEmail(e)} />
                    <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 2.7 }} type="password" name="password" id="password" placeholder='Mot de passe' className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]' onKeyUp={e => handleEnter(e, connect)} onChange={e => setPassword(e.target.value)} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 2.9 }} className='text-end cursor-pointer' onClick={toggleLostPassword}>Mot de passe oublié ?</motion.div>
                  </>
                }
                {isLostPassword &&
                  <>
                    <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 2.3 }} type="text" name="identifiant" id="identifiant" placeholder='Adresse email' className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 mt-8 placeholder:text-[#757879]' onKeyUp={e => handleEnter(e, recoverPassword)} onChange={e => setUsername(e.target.value)} onBlur={(e) => validateEmail(e)} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 2.9 }} className='text-end cursor-pointer' onClick={toggleLostPassword}>Revenir à l'écran de connexion</motion.div>
                  </>
                }
              </div>
            </div>
          </div>
          <div className='w-[10vw] self-center lg:ml-[20vw]'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ transition: transition1, duration: 3 }} className=''>
              <SubmitButton />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
