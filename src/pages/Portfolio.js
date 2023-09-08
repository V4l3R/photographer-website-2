import React, { useContext, useState, useCallback, useEffect } from 'react';

import { motion } from 'framer-motion';

import ImageViewer from 'react-simple-image-viewer';
import { Gallery } from "react-grid-gallery";

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

import GalleryList from '../components/GalleryList';

// import collections from '../data/collections';

// import images, { createCollection, reset } from '../data/images';
import images, { createCollection, reset } from '../data/imagesDumb';

import http from "../common/http-common";


import { DEFAULT_COLLECTION, GALLERY_IMAGE_HEIGHT, GALLERY_IMAGE_MARGIN } from '../data/constantes';

const Portfolio = () => {

  const { mouseEnterHandler, mouseLeaveHandler, mouseDisappearHandler } = useContext(CursorContext);
  const [currentCollection, setCurrentCollection] = useState(DEFAULT_COLLECTION);
  const [imageList, setImageList] = useState([]);
  const [imageListSrc, setImageListSrc] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [newAlbumName, setNewAlbumName] = useState("")
  const [updatedAlbumName, setUpdatedAlbumName] = useState("")
  const [updatedPictureName, setUpdatedPictureName] = useState("")
  const [isOpenPicAddPopup, setIsOpenPicAddPopup] = useState(false)
  const [isOpenPicRenamePopup, setIsOpenPicRenamePopup] = useState(false)
  const [isOpenPicDeletePopup, setIsOpenPicDeletePopup] = useState(false)
  const [isOpenAlbCreatePopup, setIsOpenAlbCreatePopup] = useState(false)
  const [isOpenAlbRenamePopup, setIsOpenAlbRenamePopup] = useState(false)
  const [isOpenAlbDeletePopup, setIsOpenAlbDeletePopup] = useState(false)
  const [currentFile, setCurrentFile] = useState(undefined)

  const [imageList2, setImageList2] = useState([]);
  const [currentImgList, setCurrentImgList] = useState([]);
  const [listSelectedImg, setListSelectedImg] = useState([]);
  const [collections, setCollections] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

    dumb();

    // getImgList();
    // getCollections();

    // getCollections().then(() => {
    // })

    // setCurrentImgList(createCollection(collections[0]))

    return () => {

    }
  }, [])

  function dumb() {

    const dumbList = [
      "testtttt",
      "tttttttttttest"
    ]

    setCollections(dumbList);

    const dumbObj =
    {
      albumName: "testtttt",
      pictures: [
        {
          name: "je n'ai pas de point",
          base64: "1"
        },
        {
          name: "2",
          base64: "2"
        },
        {
          name: "3.test",
          base64: "3"
        },
      ]
    }

    const collection = createCollection(dumbObj);
    setImageList(collection);
    setImageListSrc(filterJsonArraySrc(collection));
    setListSelectedImg([]);

    console.log("on a comme collection ");
    console.log(collection);

  }

  function checkCollection(image) {
    return image.collectionName === currentCollection;
  }

  function filterJsonArraySrc(jsonArray) {
    const resp = [];
    console.log("on passe dans le filter");
    jsonArray.forEach(element => {
      resp.push(element.src);
    });
    return resp;
  }

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const changeCollection = (e) => {
    setCurrentCollection(e.target.innerText);
    console.log("on change la collection");
    console.log(currentCollection);
    console.log(e.target.innerText);

    // Recharger image list
    getImgList();
  }

  const changeCurrentCollection = (e) => {

    setCurrentCollection(e.target.value);

    // Recharger image list
    changeImgList(e.target.value);

  }



  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  function selectFile(event) {
    console.log("On a : ");
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

  function clearPictureName(path) {
    const prefixLength = "/static/media/".length;
    let answer = path.slice(prefixLength);
    let indexes = [];
    let array = answer.split('');
    let element = '.';
    let idx = array.indexOf(element);

    while (idx !== -1) {
      indexes.push(idx + 1);
      idx = array.indexOf(element, idx + 1);
    }

    return answer.split(answer.substr(indexes[indexes.length - 2], indexes[indexes.length - 1] - indexes[indexes.length - 2])).join("");
  }

  function getCollections() {
    fetch("/getAlbumsList")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCollections(data.albumsName);
        // setCurrentImgList(createCollection(data.collections[0]))
      });
  }

  function refreshCollections(actualCollection) {
    fetch("/getAlbumsList")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCollections(data.albumsName);
        setCurrentCollection(actualCollection);
        // setCurrentImgList(createCollection(data.collections[0]))
      });
  }

  function refreshCollectionsAndImgList(actualCollection) {
    fetch("/getAlbumsList")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCollections(data.albumsName);
        setCurrentCollection(actualCollection);
        changeImgList(actualCollection);
        // setCurrentImgList(createCollection(data.collections[0]))
      });
  }

  function resetCollections() {
    fetch("/getAlbumsList")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCollections(data.albumsName);
        setCurrentCollection(data.albumsName[0]);
        changeImgList(data.albumsName[0]);
        // setCurrentImgList(createCollection(data.collections[0]))
      });
  }

  function createNewAlbum() {

    if (newAlbumName === "") {
      return;
    }

    let formData = new FormData();
    formData.append("newAlbumName", newAlbumName);

    // return http.post("/createAlbum", formData, {
    return http.post("/saveAlbum", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        // if(targetedAlbumName === undefined) {
        //   initialize();
        // } else {
        //   getAlbums();
        // }
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
    let newAlbumName = "test46";
    // let newAlbumName = updatedAlbumName;
    formData.append("newAlbumName", newAlbumName);
    formData.append("targetedAlbumName", currentCollection);

    // return http.post("/createAlbum", formData, {
    return http.post("/renameAlbum", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
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

    if (currentCollection === "" || listSelectedImg.length < 1) {
      return;
    }

    let file = currentFile;
    let formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    formData.append("targetedAlbumName", currentCollection);

    return http.post("/uploadPictures", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        changeImgList(currentCollection);
        setCurrentFile(undefined);
        document.getElementById('uploadFile').value = "";
        closeAddPicturePopup();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
      });

  }

  function toggleCreateAlbumPopup() {

    setIsOpenAlbCreatePopup(!isOpenAlbCreatePopup);
  }

  function closeCreateAlbumPopup() {

    setIsOpenAlbCreatePopup(false);
  }

  function toggleRenameAlbumPopup() {

    if (currentCollection === "") {
      setIsOpenAlbRenamePopup(false);
      return;
    }

    setIsOpenAlbRenamePopup(!isOpenAlbRenamePopup);
  }

  function closeRenameAlbumPopup() {

    setIsOpenAlbRenamePopup(false);
  }

  function toggleAddPicturePopup() {

    // On vérifie qu'il y a un album de selectionné
    if (currentCollection === "") {
      setIsOpenPicAddPopup(false);
      return;
    }

    setIsOpenPicAddPopup(!isOpenPicAddPopup);
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
  }

  function closeDeletePicturePopup() {

    setIsOpenPicDeletePopup(false);
  }

  function toggleDeleteAlbumPopup() {

    // On vérifie qu'il y ait au moins un album de selectionné
    if (currentCollection === "") {
      setIsOpenAlbDeletePopup(false);
      return;
    }

    setIsOpenAlbDeletePopup(!isOpenAlbDeletePopup);
  }

  function closeDeleteAlbumPopup() {

    setIsOpenAlbDeletePopup(false);
  }

  function renamePicture() {

    if (listSelectedImg.length !== 1) {
      return;
    }

    let formData = new FormData();

    formData.append("targetedAlbumName", currentCollection);
    formData.append("updatedPicture", listSelectedImg);
    formData.append("updatedPictureName", updatedPictureName);

    return http.post("/updatePictureName", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      // setErrorMessage(error.response.data);
    }).then((res) => {
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
    formData.append("deletedPictures", listSelectedImg);
    formData.append("targetedAlbumName", currentCollection);

    // return http.post("/test", formData, {
    return http.post("/deleteAlbumPictures", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      // setErrorMessage(error.response.data);
    }).then((res) => {
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

    formData.append("targetedAlbumName", currentCollection);

    // return http.post("/test", formData, {
    return http.post("/deleteAlbum", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      // setErrorMessage(error.response.data);
    }).then((res) => {
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

    formData.append("targetedAlbumName", currentCollection);

    return http.post("/getAlbumPictures", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      // setErrorMessage(error.response.data);
    }).then((res) => {
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

    formData.append("targetedAlbumName", collectionName);

    return http.post("/getAlbumPictures", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      // setErrorMessage(error.response.data);
    }).then((res) => {
      // reset();
      // console.log("on reset");
      console.log(res);
      const collection = createCollection(res.data);
      setImageList(collection);
      setImageListSrc(filterJsonArraySrc(collection));
      setListSelectedImg([]);
    });

  }

  function clg() {
    console.log(imageList);
    // console.log(importAll(require.context('../../../photographer-website-back/albums/Petits%20chats/', false, /\.(png|jpe?g|svg)$/)));
  }

  function clgTest() {
    console.log("test")
  }


  return (
    <>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition1} className='section'>
        <h1 onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='h1 pt-28 text-6xl container mx-auto pl-[10vw] xs:pl-[17vw] sm:pl-[20vw]'>Mes créations</h1>
        <div style={{ backgroundColor: 'white' }} onMouseEnter={mouseDisappearHandler} onMouseLeave={mouseLeaveHandler} className='mx-auto h-[75vh] w-[90vw] pt-4'>
          <div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} className='grid grid-cols-12 grid-flow-col gap-y-40 h-[75vh]' >
            <div className='xl:block h-full col-span-2 bg-slate-200 hover:w-[250px] xl:hover:w-auto hover:relative hover:z-50 overflow-y-scroll overflow-x-hidden scrollbar scrollbar-w-2 scrollbar-thumb-gray-900 scrollbar-track-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full' >
              <motion.div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} className='h-full col-span-2 text-[#696c6d]'>
                <div>test</div>
                <GalleryList collection={collections} collectionHandler={changeCollection} />
              </motion.div>
            </div>
            <div className='ml-2 h-full col-span-11 xl:col-span-10 overflow-y-scroll scrollbar scrollbar-w-3 scrollbar-thumb-gray-900 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-slate-100'>
              <motion.div initial={{ opacity: 0, y: '80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '80%' }} transition={transition1}>
                <div className='flex'>
                  <div>Selectionnez un album</div>
                  <div>
                    <select name="" id="" value={currentCollection} onChange={e => changeCurrentCollection(e)}>
                      {
                        collections.map(albumName =>
                          <option>{albumName}</option>
                        )
                      }
                    </select>
                  </div>
                  {isOpenAlbCreatePopup &&
                    <div className='flex'>
                      {/* <input type="text" name="" placeholder='Nouveau nom' id="addAlbumText" onChange={e => setUpdatedAlbumName(e.target.value)} className='w-[17vw] outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]' /> */}
                      <input type="text" name="" placeholder='Nouvel album' id="addAlbumText" onChange={e => setNewAlbumName(e.target.value)} className='w-[17vw] outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]' />
                      <div onClick={createNewAlbum} className={`${newAlbumName === "" ? 'opacity-50' : 'opacity-100 cursor-pointer'}`} >
                        <AiFillCheckCircle />
                      </div>
                      <div onClick={closeCreateAlbumPopup}>
                        <AiFillCloseCircle />
                      </div>
                    </div>
                  }
                  {/* <button onClick={createNewAlbum} className='w-[17vw]'> */}
                  {/* <div onClick={deletePicture}> */}
                  {isOpenAlbRenamePopup &&
                    <div className='flex'>
                      <input type="text" name="" placeholder='Nouveau nom' id="addAlbumText" onChange={e => setUpdatedAlbumName(e.target.value)} className='w-[17vw] outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]' />
                      <div onClick={renameAlbum} className={`${currentCollection === "" ? 'opacity-50' : 'opacity-100 cursor-pointer'}`} >
                        <AiFillCheckCircle />
                      </div>
                      <div onClick={closeRenameAlbumPopup}>
                        <AiFillCloseCircle />
                      </div>
                    </div>
                  }
                  {isOpenPicAddPopup &&
                    <form className='flex'>
                      <input id="uploadFile" type="file" accept="image/*" multiple="multiple" onChange={selectFile} />
                      <div onClick={addPictures} className={`${listSelectedImg.length < 1 ? 'opacity-50' : 'opacity-100 cursor-pointer'}`} >
                        <AiFillCheckCircle />
                      </div>
                      <div onClick={closeAddPicturePopup}>
                        <AiFillCloseCircle />
                      </div>
                      {/* <button onClick={clgFile}>Envoyer</button> */}
                    </form>
                  }
                  {isOpenPicRenamePopup &&
                    <div className='flex'>
                      <input type="text" name="" placeholder='Nouveau nom' id="addAlbumText" onChange={e => setUpdatedPictureName(e.target.value)} className='w-[17vw] outline-none border-b border-b-primary bg-transparent text-center placeholder:text-[#757879]' />
                      <div onClick={renamePicture} className={`${listSelectedImg.length !== 1 ? 'opacity-50' : 'opacity-100 cursor-pointer'}`} >
                        <AiFillCheckCircle />
                      </div>
                      <div onClick={closeRenamePicturePopup}>
                        <AiFillCloseCircle />
                      </div>
                    </div>
                  }
                  {isOpenPicDeletePopup &&
                    <div className='flex'>
                      <div>Êtes-vous sûr de vouloir supprimer ces photos ? : </div>
                      <div onClick={deletePictures} className={`${listSelectedImg.length < 1 ? 'opacity-50' : 'opacity-100 cursor-pointer'}`} >
                        <AiFillCheckCircle />
                      </div>
                      <div onClick={closeDeletePicturePopup}>
                        <AiFillCloseCircle />
                      </div>
                    </div>
                  }
                  {isOpenPicDeletePopup &&
                    <div className='flex'>
                      <div>Êtes-vous sûr de vouloir supprimer cet album ? : </div>
                      <div onClick={deleteAlbum} className={`${currentCollection === "" ? 'opacity-50' : 'opacity-100 cursor-pointer'}`} >
                        <AiFillCheckCircle />
                      </div>
                      <div onClick={closeDeleteAlbumPopup}>
                        <AiFillCloseCircle />
                      </div>
                    </div>
                  }
                  <div onClick={toggleCreateAlbumPopup}>
                    <MdAddToPhotos />
                  </div>
                  <div onClick={toggleRenameAlbumPopup} className={`${currentCollection === "" ? 'opacity-50' : 'opacity-100 cursor-pointer'} ${isOpenAlbRenamePopup ? 'border-b-2 border-black' : ''}`}>
                    <FaPenNib />
                  </div>
                  <div onClick={toggleAddPicturePopup} className={`${currentCollection === "" ? 'opacity-50' : 'opacity-100 cursor-pointer'} ${isOpenPicAddPopup ? 'border-b-2 border-black' : ''}`}>
                    <MdAddPhotoAlternate />
                  </div>
                  <div onClick={toggleRenamePicturePopup} className={`${listSelectedImg.length !== 1 ? 'opacity-50' : 'opacity-100 cursor-pointer'} ${isOpenPicRenamePopup ? 'border-b-2 border-black' : ''}`}>
                    <RiImageEditFill />
                  </div>
                  <div onClick={toggleDeletePicturePopup} className={`${listSelectedImg.length < 1 ? 'opacity-50' : 'opacity-100 cursor-pointer'} ${isOpenPicDeletePopup ? 'border-b-2 border-black' : ''}`}>
                    <BsFillTrashFill />
                  </div>
                  <div onClick={toggleDeleteAlbumPopup} className={`${currentCollection === "" ? 'opacity-50' : 'opacity-100 cursor-pointer'} ${isOpenAlbDeletePopup ? 'border-b-2 border-black' : ''}`}>
                    <GiChewedSkull />
                  </div>
                </div>
                <Gallery images={imageList} margin={GALLERY_IMAGE_MARGIN} enableImageSelection={true} rowHeight={GALLERY_IMAGE_HEIGHT} onSelect={(index, img, el) => selectImg(index, img)} onClick={(e) => { openImageViewer(e) }} />
                {/* <Gallery images={currentImgList} margin={GALLERY_IMAGE_MARGIN} enableImageSelection={true} rowHeight={GALLERY_IMAGE_HEIGHT} onSelect={(index, img, el) => selectImg(index, img)} onClick={(e) => { openImageViewer(e) }} /> */}
                {/* <Gallery images={imageList} margin={GALLERY_IMAGE_MARGIN} enableImageSelection={true} rowHeight={GALLERY_IMAGE_HEIGHT} onClick={(e) => { openImageViewer(e) }} /> */}
              </motion.div>
            </div>
            <div className=''>
            </div>
          </div>
        </div>
      </motion.section>
      {isViewerOpen && (
        <div onMouseEnter={mouseDisappearHandler} onMouseLeave={mouseLeaveHandler} style={{ position: 'absolute' }} className='z-50'>
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
