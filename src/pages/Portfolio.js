import React, { useContext, useState, useCallback, useEffect } from 'react';

import { motion } from 'framer-motion';

import ImageViewer from 'react-simple-image-viewer';
import { Gallery } from 'react-grid-gallery';

import { BiExit } from 'react-icons/bi';
import { MdAddToPhotos } from 'react-icons/md';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { FaPenNib } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { GiChewedSkull } from 'react-icons/gi';
import { RiImageEditFill } from 'react-icons/ri';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

import { transition1 } from '../transitions';
import { CursorContext } from '../context/CursorContext';

// import collections from '../data/collections';

// import images, { createCollection, reset } from '../data/images';
import images, { createCollection, reset } from '../data/imagesDumb';

import http from '../common/http-common';

import {
 DEFAULT_COLLECTION,
 GALLERY_IMAGE_HEIGHT,
 GALLERY_IMAGE_MARGIN,
} from '../data/constantes';

import { SettingsContext } from '../context/SettingsContext';
import { AdminContext } from '../context/AdminContext';
import { FocusContext } from '../context/FocusContext';

const iconSize = 20;

const Portfolio = () => {
 const { mouseEnterHandler, mouseLeaveHandler, mouseDisappearHandler } =
  useContext(CursorContext);
 const { galleryImageHeight, gallerySpacing } = useContext(SettingsContext);
 const { isAdmin, adminUsername, accessToken } = useContext(AdminContext);
 const { togglePortfolioActive } = useContext(FocusContext);

 const [currentCollection, setCurrentCollection] = useState('');
 const [imageList, setImageList] = useState([]);
 const [imageListSrc, setImageListSrc] = useState([]);
 const [currentImage, setCurrentImage] = useState(0);
 const [isViewerOpen, setIsViewerOpen] = useState(false);

 const [newAlbumName, setNewAlbumName] = useState('');
 const [updatedAlbumName, setUpdatedAlbumName] = useState('');
 const [updatedPictureName, setUpdatedPictureName] = useState('');
 const [isOpenPicAddPopup, setIsOpenPicAddPopup] = useState(false);
 const [isOpenPicRenamePopup, setIsOpenPicRenamePopup] = useState(false);
 const [isOpenPicDeletePopup, setIsOpenPicDeletePopup] = useState(false);
 const [isOpenAlbCreatePopup, setIsOpenAlbCreatePopup] = useState(false);
 const [isOpenAlbRenamePopup, setIsOpenAlbRenamePopup] = useState(false);
 const [isOpenAlbDeletePopup, setIsOpenAlbDeletePopup] = useState(false);
 const [currentFile, setCurrentFile] = useState([]);

 const [imageList2, setImageList2] = useState([]);
 const [currentImgList, setCurrentImgList] = useState([]);
 const [listSelectedImg, setListSelectedImg] = useState([]);
 const [collections, setCollections] = useState([]);

 const [errorMessage, setErrorMessage] = useState('');

 useEffect(() => {
  togglePortfolioActive();
  dumb();

  getCollections();
  getDefaultCollection();
  // getImgList();

  // getCollections().then(() => {
  // })

  // setCurrentImgList(createCollection(collections[0]))

  return () => {};
 }, []);

 function dumb() {
  const dumbList = [
   'testtttt',
   'tttttttttttest',
   "test avec un nom d'album super long",
   "test avec un nom d'album super super super super super super long",
  ];

  setCollections(dumbList);
  setCurrentCollection(dumbList[0]);

  const dumbObj = {
   albumName: 'testtttt',
   pictures: [
    {
     name: "je n'ai pas de point",
     base64: '1',
    },
    {
     name: '2',
     base64: '2',
    },
    {
     name: '3.test',
     base64: '3',
    },
    {
     name: "je n'ai pas de point",
     base64: '1',
    },
    {
     name: '2',
     base64: '2',
    },
    {
     name: '3.test',
     base64: '3',
    },
    {
     name: "je n'ai pas de point",
     base64: '1',
    },
    {
     name: '2',
     base64: '2',
    },
    {
     name: '3.test',
     base64: '3',
    },
   ],
  };

  const collection = createCollection(dumbObj);
  setImageList(collection);
  setImageListSrc(filterJsonArraySrc(collection));
  setListSelectedImg([]);

  console.log('on a comme collection ');
  console.log(collection);
 }

 // Creer Album
 useEffect(() => {
  if (isOpenAlbCreatePopup) document.getElementById('addAlbumInput').focus();

  return () => {};
 }, [isOpenAlbCreatePopup]);

 // Renommer album
 useEffect(() => {
  if (isOpenAlbRenamePopup) document.getElementById('renameAlbumInput').focus();

  return () => {};
 }, [isOpenAlbRenamePopup]);

 // Ajouter photos
 useEffect(() => {
  if (isOpenPicAddPopup) document.getElementById('uploadFile').click();

  return () => {};
 }, [isOpenPicAddPopup]);

 useEffect(() => {
  if (currentFile.length > 0) addPictures();

  return () => {};
 }, [currentFile]);

 // Renommer photos
 useEffect(() => {
  if (isOpenPicRenamePopup)
   document.getElementById('renamePictureInput').focus();

  return () => {};
 }, [isOpenPicRenamePopup]);

 function checkCollection(image) {
  return image.collectionName === currentCollection;
 }

 function filterJsonArraySrc(jsonArray) {
  const resp = [];
  console.log('on passe dans le filter');
  jsonArray.forEach((element) => {
   resp.push(element.src);
  });
  return resp;
 }

 function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
   images[item.replace('./', '')] = r(item);
  });
  return images;
 }

 const changeCollection = (e) => {
  setCurrentCollection(e.target.innerText);
  console.log('on change la collection');
  console.log(currentCollection);
  console.log(e.target.innerText);

  // Recharger image list
  getImgList();
 };

 const changeCurrentCollection = (e) => {
  setCurrentCollection(e.target.value);

  // Recharger image list
  changeImgList(e.target.value);
 };

 const openImageViewer = useCallback((index) => {
  setCurrentImage(index);
  setIsViewerOpen(true);
 }, []);

 const closeImageViewer = () => {
  setCurrentImage(0);
  setIsViewerOpen(false);
 };

 function selectFile(event) {
  console.log('On a : ');
  console.log(event.target.files);
  setCurrentFile(event.target.files);
  // setPreviewImage(URL.createObjectURL(event.target.files[0]));
  // setProgress(0);
  // setMessage("");

  // setErrorMessage("");
 }

 function selectImg(index, img) {
  console.log(img);
  imageList[index].isSelected = !imageList[index].isSelected;
  if (imageList[index].isSelected) {
   // listSelectedImg.push(clearPictureName(img.src));
   listSelectedImg.push(img.id);
  } else {
   // listSelectedImg.splice(listSelectedImg.indexOf(clearPictureName(img.src)), 1);
   listSelectedImg.splice(listSelectedImg.indexOf(img.id), 1);
  }
  console.log(listSelectedImg);
  if (listSelectedImg.length !== 1) {
   setIsOpenPicRenamePopup(false);
  }
 }

 function decodeURIArray(array) {
  console.log('decodeURIArray');
  console.log(array);
  let arr = array.map(decodeURIComponent);
  console.log(arr);
  return arr;
 }

 function clearPictureName(path) {
  const prefixLength = '/static/media/'.length;
  let answer = path.slice(prefixLength);
  let indexes = [];
  let array = answer.split('');
  let element = '.';
  let idx = array.indexOf(element);

  while (idx !== -1) {
   indexes.push(idx + 1);
   idx = array.indexOf(element, idx + 1);
  }

  return answer
   .split(
    answer.substr(
     indexes[indexes.length - 2],
     indexes[indexes.length - 1] - indexes[indexes.length - 2],
    ),
   )
   .join('');
 }

 function getCollections() {
  fetch('/getAlbumsList')
   .then((res) => res.json())
   .then((data) => {
    console.log('on a data : ');
    console.log(data.albumsName);
    console.log(decodeURIArray(data.albumsName));
    setCollections(decodeURIArray(data.albumsName));
    // setCurrentImgList(createCollection(data.collections[0]))
   });
 }

 function getCollectionsAndSetDefaultAlbum() {
  fetch('/getAlbumsList')
   .then((res) => res.json())
   .then((data) => {
    console.log(data);
    console.log('on a data : ');
    console.log(data.albumsName);
    console.log(decodeURIArray(data.albumsName));
    setCollections(decodeURIArray(data.albumsName));
    setCurrentCollection(decodeURIComponent(data.albumsName[0]));
    changeImgList(decodeURIComponent(data.albumsName[0]));
    // setCurrentImgList(createCollection(data.collections[0]))
   });
 }

 function refreshCollections(actualCollection) {
  fetch('/getAlbumsList')
   .then((res) => res.json())
   .then((data) => {
    console.log(data);
    console.log('on a data : ');
    console.log(data.albumsName);
    console.log(decodeURIArray(data.albumsName));
    setCollections(decodeURIArray(data.albumsName));
    setCurrentCollection(actualCollection);
    // setCurrentImgList(createCollection(data.collections[0]))
   });
 }

 function refreshCollectionsAndImgList(actualCollection) {
  fetch('/getAlbumsList')
   .then((res) => res.json())
   .then((data) => {
    console.log(data);
    console.log('on a data : ');
    console.log(data.albumsName);
    console.log(decodeURIArray(data.albumsName));
    setCollections(decodeURIArray(data.albumsName));
    setCurrentCollection(decodeURIComponent(actualCollection));
    changeImgList(decodeURIComponent(actualCollection));
    // setCurrentImgList(createCollection(data.collections[0]))
   });
 }

 function resetCollections() {
  fetch('/getAlbumsList')
   .then((res) => res.json())
   .then((data) => {
    console.log(data);
    console.log('on a data : ');
    console.log(data.albumsName);
    console.log(decodeURIArray(data.albumsName));
    setCollections(decodeURIArray(data.albumsName));
    setCurrentCollection(decodeURIComponent(data.albumsName[0]));
    changeImgList(decodeURIComponent(data.albumsName[0]));
    // setCurrentImgList(createCollection(data.collections[0]))
   });
 }

 function getDefaultCollection() {
  fetch('/getDefaultAlbumName')
   .then((res) => res.json())
   .then((data) => {
    console.log('getDefaultAlbumName : ');
    console.log(data);
    console.log(data.defaultAlbumName);
    // setCollections(data.albumsName);

    if (data.defaultAlbumName === '') {
     getCollectionsAndSetDefaultAlbum();
    } else {
     getCollections();
     setCurrentCollection(decodeURIComponent(data.defaultAlbumName));
     changeImgList(decodeURIComponent(data.defaultAlbumName));
    }

    // setCurrentCollection(data.albumsName[0]);
    // changeImgList(data.albumsName[0]);
    // setCurrentImgList(createCollection(data.collections[0]))
   });
 }

 function createNewAlbum() {
  if (newAlbumName === '') {
   return;
  }

  let formData = new FormData();
  formData.append('newAlbumName', encodeURIComponent(newAlbumName));
  formData.append('adminUsername', adminUsername);
  formData.append('accessToken', accessToken);
  // formData.append('adminUsername', encodeURIComponent(adminUsername));
  // formData.append('accessToken', encodeURIComponent(accessToken));

  return http
   .post('/saveAlbum', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    refreshCollectionsAndImgList(newAlbumName);
    closeCreateAlbumPopup();
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
   });
 }

 function renameAlbum() {
  let formData = new FormData();
  let newAlbumName = updatedAlbumName;

  formData.append('newAlbumName', encodeURIComponent(newAlbumName));
  formData.append('targetedAlbumName', encodeURIComponent(currentCollection));
  formData.append('adminUsername', adminUsername);
  formData.append('accessToken', accessToken);

  return http
   .post('/renameAlbum', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .then((res) => {
    // if(targetedAlbumName === undefined) {
    //   initialize();
    // } else {
    // getAlbums();
    // getCollections();
    refreshCollections(newAlbumName);
    closeRenameAlbumPopup();
    // }
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
   });
 }

 function addPictures() {
  if (currentCollection === '' || currentFile.length < 1) {
   return;
  }

  let file = currentFile;
  let formData = new FormData();

  for (let i = 0; i < file.length; i++) {
   formData.append('files', file[i]);
  }

  formData.append('targetedAlbumName', encodeURIComponent(currentCollection));
  formData.append('adminUsername', adminUsername);
  formData.append('accessToken', accessToken);

  return http
   .post('/uploadPictures', formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   })
   .then((res) => {
    changeImgList(currentCollection);
    setCurrentFile([]);
    document.getElementById('uploadFile').value = '';
    closeAddPicturePopup();
   })
   .catch((error) => {
    console.log(error);
    setErrorMessage(error.response.data);
   });
 }

 function toggleCreateAlbumPopup() {
  setIsOpenAlbCreatePopup(!isOpenAlbCreatePopup);
  setIsOpenPicAddPopup(false);
  setIsOpenPicRenamePopup(false);
  setIsOpenPicDeletePopup(false);
  setIsOpenAlbDeletePopup(false);
  setIsOpenAlbRenamePopup(false);
 }

 function closeCreateAlbumPopup() {
  setIsOpenAlbCreatePopup(false);
 }

 function toggleRenameAlbumPopup() {
  if (currentCollection === '') {
   setIsOpenAlbRenamePopup(false);
   return;
  }

  setIsOpenAlbRenamePopup(!isOpenAlbRenamePopup);
  setIsOpenPicAddPopup(false);
  setIsOpenPicRenamePopup(false);
  setIsOpenPicDeletePopup(false);
  setIsOpenAlbCreatePopup(false);
  setIsOpenAlbDeletePopup(false);
 }

 function closeRenameAlbumPopup() {
  setIsOpenAlbRenamePopup(false);
 }

 function toggleAddPicturePopup() {
  // On vérifie qu'il y a un album de selectionné
  if (currentCollection === '') {
   setIsOpenPicAddPopup(false);
   return;
  }

  setIsOpenPicAddPopup(!isOpenPicAddPopup);
  setIsOpenPicRenamePopup(false);
  setIsOpenPicDeletePopup(false);
  setIsOpenAlbCreatePopup(false);
  setIsOpenAlbDeletePopup(false);
  setIsOpenAlbRenamePopup(false);
 }

 function closeAddPicturePopup() {
  setIsOpenPicAddPopup(false);
 }

 function toggleRenamePicturePopup() {
  // On vérifie qu'il y a une seule photo de selectionnée
  if (listSelectedImg.length !== 1) {
   setIsOpenPicRenamePopup(false);
   return;
  }

  setIsOpenPicRenamePopup(!isOpenPicRenamePopup);
  setIsOpenPicAddPopup(false);
  setIsOpenPicDeletePopup(false);
  setIsOpenAlbCreatePopup(false);
  setIsOpenAlbDeletePopup(false);
  setIsOpenAlbRenamePopup(false);
 }

 function closeRenamePicturePopup() {
  setIsOpenPicRenamePopup(false);
 }

 function toggleDeletePicturePopup() {
  // On vérifie qu'il y ait au moins une photo de selectionnée
  if (listSelectedImg.length < 1) {
   setIsOpenPicDeletePopup(false);
   return;
  }

  setIsOpenPicDeletePopup(!isOpenPicDeletePopup);
  setIsOpenPicAddPopup(false);
  setIsOpenPicRenamePopup(false);
  setIsOpenAlbCreatePopup(false);
  setIsOpenAlbDeletePopup(false);
  setIsOpenAlbRenamePopup(false);
 }

 function closeDeletePicturePopup() {
  setIsOpenPicDeletePopup(false);
 }

 function toggleDeleteAlbumPopup() {
  // On vérifie qu'il y ait au moins un album de selectionné
  if (currentCollection === '') {
   setIsOpenAlbDeletePopup(false);
   return;
  }

  setIsOpenAlbDeletePopup(!isOpenAlbDeletePopup);
  setIsOpenPicAddPopup(false);
  setIsOpenPicRenamePopup(false);
  setIsOpenPicDeletePopup(false);
  setIsOpenAlbCreatePopup(false);
  setIsOpenAlbRenamePopup(false);
 }

 function closeDeleteAlbumPopup() {
  setIsOpenAlbDeletePopup(false);
 }

 function renamePicture() {
  if (listSelectedImg.length !== 1) {
   return;
  }

  let formData = new FormData();

  formData.append('targetedAlbumName', encodeURIComponent(currentCollection));
  formData.append('updatedPicture', listSelectedImg);
  formData.append('updatedPictureName', encodeURIComponent(updatedPictureName));
  formData.append('adminUsername', adminUsername);
  formData.append('accessToken', accessToken);

  return http
   .post('/updatePictureName', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .catch((error) => {
    console.log(error);
    // setErrorMessage(error.response.data);
   })
   .then((res) => {
    // reset();
    // console.log("on reset");
    console.log(res);
    getImgList();
    closeRenamePicturePopup();
    // console.log(createCollection(res.data));
    // setImageList(createCollection(res.data));
   });
 }

 function deletePictures() {
  if (listSelectedImg.length < 1) {
   return;
  }

  let formData = new FormData();
  // for (let i = 0; i < listSelectedImg.length; i++) {
  //   formData.append("deletedPictures", listSelectedImg[i]);

  // }
  formData.append('deletedPictures', listSelectedImg);
  formData.append('targetedAlbumName', encodeURIComponent(currentCollection));
  formData.append('adminUsername', adminUsername);
  formData.append('accessToken', accessToken);

  return http
   .post('/deleteAlbumPictures', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .catch((error) => {
    console.log(error);
    // setErrorMessage(error.response.data);
   })
   .then((res) => {
    // reset();
    // console.log("on reset");
    console.log(res);
    getImgList();
    closeDeletePicturePopup();
    // console.log(createCollection(res.data));
    // setImageList(createCollection(res.data));
   });
 }

 function deleteAlbum() {
  let formData = new FormData();

  formData.append('targetedAlbumName', encodeURIComponent(currentCollection));
  formData.append('adminUsername', adminUsername);
  formData.append('accessToken', accessToken);

  return http
   .post('/deleteAlbum', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .catch((error) => {
    console.log(error);
    // setErrorMessage(error.response.data);
   })
   .then((res) => {
    // reset();
    // console.log("on reset");
    console.log(res);
    resetCollections();
    closeDeleteAlbumPopup();
    // console.log(createCollection(res.data));
    // setImageList(createCollection(res.data));
   });
 }

 function getImgList() {
  let formData = new FormData();

  formData.append('targetedAlbumName', encodeURIComponent(currentCollection));

  return http
   .post('/acquireAlbumPictures', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .catch((error) => {
    console.log(error);
    // setErrorMessage(error.response.data);
   })
   .then((res) => {
    // reset();
    // console.log("on reset");
    console.log(res);
    const collection = createCollection(res.data);
    setImageList(collection);
    setImageListSrc(filterJsonArraySrc(collection));
    setListSelectedImg([]);
   });
 }

 function changeImgList(collectionName) {
  let formData = new FormData();

  formData.append('targetedAlbumName', encodeURIComponent(collectionName));

  return http
   .post('/acquireAlbumPictures', formData, {
    headers: {
     'Content-Type': 'application/json',
    },
   })
   .catch((error) => {
    console.log(error);
    // setErrorMessage(error.response.data);
   })
   .then((res) => {
    // reset();
    // console.log("on reset");
    console.log(res);
    const collection = createCollection(res.data);
    setImageList(collection);
    setImageListSrc(filterJsonArraySrc(collection));
    setListSelectedImg([]);
   });
 }

 function handleEnter(event, func) {
  if (event.key === 'Enter') {
   func();
  }
 }

 function clg() {
  console.log(imageList);
  // console.log(importAll(require.context('../../../photographer-website-back/albums/Petits%20chats/', false, /\.(png|jpe?g|svg)$/)));
 }

 function clgTest() {
  console.log('test');
 }

 return (
  <>
   <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={transition1}
    className="section"
   >
    <h1
     onMouseEnter={mouseEnterHandler}
     onMouseLeave={mouseLeaveHandler}
     className="h1 pt-28 text-6xl container mx-auto pl-[10vw] xs:pl-[17vw] sm:pl-[20vw]"
    >
     Mes créations
    </h1>
    <div
     style={{ backgroundColor: 'white' }}
     onMouseEnter={mouseDisappearHandler}
     onMouseLeave={mouseLeaveHandler}
     className="mx-auto h-[75vh] w-[90vw] pt-4"
    >
     <div
      initial={{ opacity: 0, y: '-80%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-80%' }}
      transition={transition1}
      className="grid grid-cols-12 grid-flow-col gap-y-40 h-[75vh]"
     >
      <div />
      <div className="h-full col-span-10 overflow-y-scroll scrollbar scrollbar-w-3 scrollbar-thumb-gray-900 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-slate-100">
       <motion.div
        initial={{ opacity: 0, y: '80%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '80%' }}
        transition={transition1}
       >
        <div className="flex justify-between px-4 mt-3 mb-[0.55rem]">
         <div className="flex">
          <div className="text-xl pr-2 font-primary">
           Selectionnez un album :
          </div>
          <div>
           <select
            name=""
            id=""
            className="w-[17vw] mt-[0.12rem] pb-1 minimal minimal-xs"
            value={currentCollection}
            onChange={(e) => changeCurrentCollection(e)}
           >
            {collections.map((albumName) => (
             <option className="bg-slate-100 box" value={albumName}>
              {albumName}
             </option>
            ))}
           </select>
          </div>
         </div>
         {isAdmin && (
          <>
           <div className="flex">
            {isOpenAlbCreatePopup && (
             <div className="flex items-center gap-x-1">
              {/* <input type="text" name="" placeholder='Nouveau nom' id="addAlbumText" onChange={e => setUpdatedAlbumName(e.target.value)} className='w-[17vw] outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]' /> */}
              <input
               type="text"
               name="addAlbumInput"
               placeholder="Nouvel album"
               id="addAlbumInput"
               onKeyUp={(e) => handleEnter(e, createNewAlbum)}
               onChange={(e) => setNewAlbumName(e.target.value)}
               className="w-[17vw] pt-[0.125rem] pb-1 outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]"
              />
              <div
               onClick={createNewAlbum}
               className={`pl-2 ${
                newAlbumName === ''
                 ? 'opacity-50'
                 : 'opacity-100 cursor-pointer'
               }`}
              >
               <AiFillCheckCircle size={iconSize} />
              </div>
              <div onClick={closeCreateAlbumPopup}>
               <AiFillCloseCircle size={iconSize} />
              </div>
             </div>
            )}
            {/* <button onClick={createNewAlbum} className='w-[17vw]'> */}
            {/* <div onClick={deletePicture}> */}
            {isOpenAlbRenamePopup && (
             <div className="flex items-center gap-x-1">
              <input
               type="text"
               name="renameAlbumInput"
               placeholder="Nouveau nom"
               id="renameAlbumInput"
               onKeyUp={(e) => handleEnter(e, renameAlbum)}
               onChange={(e) => setUpdatedAlbumName(e.target.value)}
               className="w-[17vw] pt-[0.125rem] pb-1 outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]"
              />
              <div
               onClick={renameAlbum}
               className={`pl-2 ${
                currentCollection === '' || newAlbumName === ''
                 ? 'opacity-50'
                 : 'opacity-100 cursor-pointer'
               }`}
              >
               <AiFillCheckCircle size={iconSize} />
              </div>
              <div onClick={closeRenameAlbumPopup}>
               <AiFillCloseCircle size={iconSize} />
              </div>
             </div>
            )}
            {isOpenPicAddPopup && (
             <form className="flex items-center gap-x-1">
              <input
               id="uploadFile"
               type="file"
               accept="image/*"
               multiple="multiple"
               onChange={selectFile}
              />
              <div
               onClick={addPictures}
               id="addPicturesInput"
               className={`pl-2 ${
                currentFile.length < 1
                 ? 'opacity-50'
                 : 'opacity-100 cursor-pointer'
               }`}
              >
               <AiFillCheckCircle size={iconSize} />
              </div>
              <div onClick={closeAddPicturePopup}>
               <AiFillCloseCircle size={iconSize} />
              </div>
              {/* <button onClick={clgFile}>Envoyer</button> */}
             </form>
            )}
            {isOpenPicRenamePopup && (
             <div className="flex items-center gap-x-1">
              <input
               type="text"
               name="renamePictureInput"
               placeholder="Nouveau nom"
               id="renamePictureInput"
               onKeyUp={(e) => handleEnter(e, renamePicture)}
               onChange={(e) => setUpdatedPictureName(e.target.value)}
               className="w-[17vw] pt-[0.125rem] pb-1 outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]"
              />
              <div
               onClick={renamePicture}
               className={`pl-2 ${
                listSelectedImg.length !== 1
                 ? 'opacity-50'
                 : 'opacity-100 cursor-pointer'
               }`}
              >
               <AiFillCheckCircle size={iconSize} />
              </div>
              <div onClick={closeRenamePicturePopup}>
               <AiFillCloseCircle size={iconSize} />
              </div>
             </div>
            )}
            {isOpenPicDeletePopup && (
             <div className="flex items-center gap-x-1">
              <div>Êtes-vous sûr de vouloir supprimer ces photos ? : </div>
              <div
               onClick={deletePictures}
               id="deletePicturesInput"
               className={`pl-2 ${
                listSelectedImg.length < 1
                 ? 'opacity-50'
                 : 'opacity-100 cursor-pointer'
               }`}
              >
               <AiFillCheckCircle size={iconSize} />
              </div>
              <div onClick={closeDeletePicturePopup}>
               <AiFillCloseCircle size={iconSize} />
              </div>
             </div>
            )}
            {isOpenAlbDeletePopup && (
             <div className="flex items-center gap-x-1">
              <div>Êtes-vous sûr de vouloir supprimer cet album ? : </div>
              <div
               onClick={deleteAlbum}
               id="deleteAlbumInput"
               className={`pl-2 ${
                currentCollection === ''
                 ? 'opacity-50'
                 : 'opacity-100 cursor-pointer'
               }`}
              >
               <AiFillCheckCircle size={iconSize} />
              </div>
              <div onClick={closeDeleteAlbumPopup}>
               <AiFillCloseCircle size={iconSize} />
              </div>
             </div>
            )}
           </div>
           <div className="flex gap-x-3 mt-[0.25rem]">
            <div
             onClick={toggleCreateAlbumPopup}
             //  onClick={setIsOpenAlbCreatePopup(!isOpenAlbCreatePopup)}
             title="Ajouter un album"
             className={`pb-2 effect-underline-base ${
              isOpenAlbCreatePopup ? 'effect-underline-active' : ''
             }`}
            >
             <MdAddToPhotos size={iconSize} />
            </div>
            <div
             onClick={toggleRenameAlbumPopup}
             title="Renommer l'album"
             className={`effect-underline-base ${
              currentCollection === ''
               ? 'opacity-50'
               : 'opacity-100 cursor-pointer'
             } ${isOpenAlbRenamePopup ? 'effect-underline-active' : ''}`}
            >
             <FaPenNib size={iconSize} />
            </div>
            <div
             onClick={toggleAddPicturePopup}
             title="Ajouter des photos"
             className={`effect-underline-base ${
              currentCollection === ''
               ? 'opacity-50'
               : 'opacity-100 cursor-pointer'
             } ${isOpenPicAddPopup ? 'effect-underline-active' : ''}`}
            >
             <MdAddPhotoAlternate size={iconSize} />
            </div>
            <div
             onClick={toggleRenamePicturePopup}
             title="Renommer la photo"
             className={`effect-underline-base ${
              listSelectedImg.length !== 1
               ? 'opacity-50'
               : 'opacity-100 cursor-pointer'
             } ${isOpenPicRenamePopup ? 'effect-underline-active' : ''}`}
            >
             <RiImageEditFill size={iconSize} />
            </div>
            <div
             onClick={toggleDeletePicturePopup}
             title="Supprimer les photos"
             className={`effect-underline-base ${
              listSelectedImg.length < 1
               ? 'opacity-50'
               : 'opacity-100 cursor-pointer'
             } ${isOpenPicDeletePopup ? 'effect-underline-active' : ''}`}
            >
             <BsFillTrashFill size={iconSize} />
            </div>
            <div
             onClick={toggleDeleteAlbumPopup}
             title="Supprimer l'album"
             className={`effect-underline-base ${
              currentCollection === ''
               ? 'opacity-50'
               : 'opacity-100 cursor-pointer'
             } ${isOpenAlbDeletePopup ? 'effect-underline-active' : ''}`}
            >
             <GiChewedSkull size={iconSize} />
            </div>
           </div>
          </>
         )}
        </div>
        <hr className="ml-2 mr-2 mb-2 border-t border-t-grey" />
        <Gallery
         images={imageList}
         margin={gallerySpacing}
         enableImageSelection={true}
         rowHeight={galleryImageHeight}
         onSelect={(index, img, el) => selectImg(index, img)}
         onClick={(e) => {
          openImageViewer(e);
         }}
        />
        {/* <Gallery images={currentImgList} margin={gallerySpacing} enableImageSelection={true} rowHeight={galleryImageHeight} onSelect={(index, img, el) => selectImg(index, img)} onClick={(e) => { openImageViewer(e) }} /> */}
        {/* <Gallery images={imageList} margin={gallerySpacing} enableImageSelection={true} rowHeight={galleryImageHeight} onClick={(e) => { openImageViewer(e) }} /> */}
       </motion.div>
      </div>
      <div className=""></div>
     </div>
    </div>
   </motion.section>
   {isViewerOpen && (
    <div
     onMouseEnter={mouseDisappearHandler}
     onMouseLeave={mouseLeaveHandler}
     style={{ position: 'absolute' }}
     className="z-50"
    >
     <ImageViewer
      src={imageListSrc}
      currentIndex={currentImage}
      disableScroll={false}
      closeOnClickOutside={true}
      onClose={closeImageViewer}
     />
    </div>
   )}
  </>
 );
};

export default Portfolio;
