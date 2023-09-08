import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import validator from "validator";
import { motion } from 'framer-motion';

import { IoMdClose } from 'react-icons/io';
import http from "../common/http-common";

import { CursorContext } from '../context/CursorContext';
import { transition1 } from '../transitions';
import { AdminContext } from '../context/AdminContext';
import { getJson } from '../data/db';
import { useEffect } from 'react';

const Admin = () => {


  const [currentFile, setCurrentFile] = useState(undefined)
  const [previewImage, setPreviewImage] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")
  const [imageInfos, setImageInfos] = useState([])

  const [newAlbumName, setNewAlbumName] = useState("")
  const [albumsList, setAlbumsList] = useState([])
  const [deletedAlbumName, setDeletedAlbumName] = useState("")
  const [targetedAlbumName, setTargetedAlbumName] = useState("")

  const [addPopupAnimationScale, setAddPopupAnimationScale] = useState(0);
  const [editPopupAnimationScale, setEditPopupAnimationScale] = useState(0);
  const [deletePopupAnimationScale, setDeletePopupAnimationScale] = useState(0);
  const [settingsPopupAnimationScale, setSettingsPopupAnimationScale] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initialize();

    return () => {
    }
  }, [])


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

  function getClg() {
    // fetch("/api")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data.message));
    console.log(deletedAlbumName);
  }


  function selectFile(event) {
    console.log("On a : ");
    console.log(event.target.files);
    setCurrentFile(event.target.files);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");

    setErrorMessage("");
  }

  function clgFile() {
    console.log(currentFile);
    upload(currentFile);
  }


  // function test() { 
  function createNewAlbum() {

    let formData = new FormData();
    formData.append("newAlbumName", newAlbumName);

    // return http.post("/createAlbum", formData, {
    return http.post("/saveAlbum", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if(targetedAlbumName === undefined) {
          initialize();
        } else {
          getAlbums();
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
      });
  }

  function initialize() {
    // fetch("/getAlbums")
    fetch("/getAlbumsList")
      .then((res) => res.json())
      .then((data) => {
        console.log("initialize");
        console.log(data);
        setAlbumsList(data.albumsName);
        setDeletedAlbumName(data.albumsName[0]);
        setTargetedAlbumName(data.albumsName[0]);
      });
  }

  function getAlbums() {
    // fetch("/getAlbums")
    fetch("/getAlbumsList")
      .then((res) => res.json())
      .then((data) => {
        console.log("getAlb");
        console.log(data);
        setAlbumsList(data.albumsName);
      });
  }

  // function updateAlbumList()

  function deleteAlbum() {
    let formData = new FormData();
    formData.append("deletedAlbumName", deletedAlbumName);

    return http.post("/test", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });
  }

  // function upload(file, onUploadProgress) {
  function upload(file) {

    let targetedEndpoint = "";
    let formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    formData.append("targetedAlbumName", targetedAlbumName);

    return http.post("/uploadPictures", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center h-[100vh] border-4 border-blue-400'>
        <div className='border-4 border-red-400 h-[60vh] w-[50vw] px-10 flex flex-col gap-y-16 items-center justify-center'>
          <div className='flex gap-x-8 w-full justify-center'>
            <input type="text" name="" placeholder='Nouvel album' id="addAlbumText" className='w-[17vw] outline-none border-b border-b-primary bg-transparent font-secondary text-center placeholder:text-[#757879]' onChange={e => setNewAlbumName(e.target.value)} />
            <button onClick={createNewAlbum} className='btn w-[17vw]'>
              Ajouter un album
            </button>
          </div>
          <div className='flex gap-x-8 w-full justify-center'>
            <button onClick={openEditAlbumPopup} className='btn w-[17vw]'>
              Modifier un album
            </button>
            <button onClick={deleteAlbum} className='btn w-[17vw]'>
              Supprimer un album
            </button>
          </div>
          <button onClick={getClg} className='btn w-[17vw]'>
            Réglages
          </button>
          <select name="" id="" value={targetedAlbumName} onChange={e => setTargetedAlbumName(e.target.value)}>
            {
              albumsList.map(x =>
                <option>{x}</option>
              )
            }
          </select>
          {/* <div>
            {{ errorMessage }}
          </div> */}
          <div>
            <input type="file" accept="image/*" multiple="multiple" onChange={selectFile} />
            <button onClick={clgFile}>Envoyer</button>
          </div>

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
