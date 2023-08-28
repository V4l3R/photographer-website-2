import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import validator from "validator";
import { motion } from 'framer-motion';

import { IoMdClose } from 'react-icons/io';

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';

const Admin = () => {

  

  const [addPopupAnimationScale, setAddPopupAnimationScale] = useState(0);
  const [editPopupAnimationScale, setEditPopupAnimationScale] = useState(0);
  const [deletePopupAnimationScale, setDeletePopupAnimationScale] = useState(0);
  const [settingsPopupAnimationScale, setSettingsPopupAnimationScale] = useState(0);

  function openAddAlbumPopup() {
    setAddPopupAnimationScale(1);
  }

  function closeAddAlbumPopup() {
    setAddPopupAnimationScale(0);
  }

  function openEditAlbumPopup() {
    setEditPopupAnimationScale(1);
  }

  function closeEditAlbumPopup() {
    setEditPopupAnimationScale(0);
  }

  function openDeleteAlbumPopup() {
    setDeletePopupAnimationScale(1);
  }

  function closeDeleteAlbumPopup() {
    setDeletePopupAnimationScale(0);
  }

  function openSettingsPopup() {
    setSettingsPopupAnimationScale(1);
  }

  function closeSettingsPopup() {
    setSettingsPopupAnimationScale(0);
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center h-[100vh] border-4 border-blue-400'>
        <div className='border-4 border-red-400 h-[60vh] w-[50vw] px-10 flex flex-col gap-y-16 items-center justify-center'>
          <div className='flex gap-x-8 w-full justify-center'>
            <input type="text" name="" placeholder='Nouvel album' id="addAlbumText" className='w-[17vw] outline-none border-b border-b-primary bg-transparent font-secondary text-center placeholder:text-[#757879]' />
            <button onClick={openAddAlbumPopup} className='btn w-[17vw]'>
              Ajouter un album
            </button>
          </div>
          <div className='flex gap-x-8 w-full justify-center'>
            <button onClick={openEditAlbumPopup} className='btn w-[17vw]'>
              Modifier un album
            </button>
            <button onClick={openDeleteAlbumPopup} className='btn w-[17vw]'>
              Supprimer un album
            </button>
          </div>
          <button onClick={openSettingsPopup} className='btn w-[17vw]'>
            Réglages
          </button>

          {/* ADD ALBUMS */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: addPopupAnimationScale }} exit={{ scale: 0 }} transition={{ transition: transition1, duration: 0.7 }} className='absolute w-[70vw] h-[80vh] z-50 bg-slate-500 border-4 border-emerald-600'>
            <div onClick={closeAddAlbumPopup} className='absolute right-0'>
              <IoMdClose />
            </div>
            add
          </motion.div>

          {/* EDIT ALBUMS */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: editPopupAnimationScale }} exit={{ scale: 0 }} transition={{ transition: transition1, duration: 0.7 }} className='absolute w-[70vw] h-[80vh] z-50 bg-slate-500 border-4 border-emerald-600'>
            <div onClick={closeEditAlbumPopup} className='absolute right-0'>
              <IoMdClose />
            </div>
            edit
          </motion.div>

          {/* DELETE ALBUMS */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: deletePopupAnimationScale }} exit={{ scale: 0 }} transition={{ transition: transition1, duration: 0.7 }} className='absolute w-[70vw] h-[80vh] z-50 bg-slate-500 border-4 border-emerald-600'>
            <div onClick={closeDeleteAlbumPopup} className='absolute right-0'>
              <IoMdClose />
            </div>
            delete
          </motion.div>

          {/* SETTINGS */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: settingsPopupAnimationScale }} exit={{ scale: 0 }} transition={{ transition: transition1, duration: 0.7 }} className='absolute w-[70vw] h-[80vh] z-50 bg-slate-500 border-4 border-emerald-600'>
            <div onClick={closeSettingsPopup} className='absolute right-0'>
              <IoMdClose />
            </div>
            Settings
          </motion.div>

        </div>
      </div>
    </>
  );

};

export default Admin;
