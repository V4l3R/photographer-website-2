import React, { useContext, useState, useCallback, useEffect } from 'react';

import { motion } from 'framer-motion';

import ImageViewer from 'react-simple-image-viewer';
import { Gallery } from "react-grid-gallery";

import { BiExit } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';

import { transition1 } from '../transitions';
import { CursorContext } from '../context/CursorContext';

import GalleryList from '../components/GalleryList';

import collections from '../data/collections';

import images, { reset } from '../data/images';

import http from "../common/http-common";


import { DEFAULT_COLLECTION, GALLERY_IMAGE_HEIGHT, GALLERY_IMAGE_MARGIN } from '../data/constantes';

const Portfolio = () => {

  const { mouseEnterHandler, mouseLeaveHandler, mouseDisappearHandler } = useContext(CursorContext);
  const [currentCollection, setCurrentCollection] = useState(DEFAULT_COLLECTION);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [imageList2, setImageList2] = useState([]);
  const [listSelectedImg, setListSelectedImg] = useState([]);
  const [collections, setCollections] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getImgList();

    return () => {

    }
  }, [])


  function checkCollection(image) {
    return image.collectionName === currentCollection;
  }

  function filterJsonArraySrc(jsonArray) {
    const resp = []
    jsonArray.forEach(element => {
      resp.push(element.src);
    });
    return resp;
  }

  const imageList = images.filter(checkCollection);
  const imageListSrc = filterJsonArraySrc(imageList);

  // let imageList2 = "";
  let imageListSrc2 = filterJsonArraySrc(imageList2);

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  function getImgList() {
    // console.log("on a img list : ");
    // console.log(importAll(require.context('../../../photographer-website-back/albums/collection%201/', false, /\.(png|jpe?g|svg)$/)));
    // console.log(importAll(require.context('../../../photographer-website-back/albums/Printemps', false, /\.(png|jpe?g|svg)$/)));
    // let path = '../../../photographer-website-back/albums/'.concat(currentCollection);
    // console.log(path);
    // console.log(importAll(require.context(path, false, /\.(png|jpe?g|svg)$/)));
    // console.log(importAll(require.context('../../../photographer-website-back/albums/'.concat(currentCollection), false, /\.(png|jpe?g|svg)$/)));
    // console.log("on a currentAlbum : ");
    // console.log(currentCollection);
  }

  const changeCollection = (e) => {
    setCurrentCollection(e.target.innerText);
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  function selectImg(index, img) {
    console.log(img);
    imageList[index].isSelected = !imageList[index].isSelected;
    if (imageList[index].isSelected) {
      listSelectedImg.push(clearPictureName(img.src));
    } else {
      listSelectedImg.splice(listSelectedImg.indexOf(clearPictureName(img.src)), 1);
    }
    console.log(listSelectedImg);
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
    fetch("/getCollections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.collections);
        console.log(data);
      });
  }

  function deletePicture() {
    let formData = new FormData();
    // for (let i = 0; i < listSelectedImg.length; i++) {
    //   formData.append("deletedPictures", listSelectedImg[i]);

    // }
    formData.append("deletedPictures", listSelectedImg);
    formData.append("targetedAlbumName", currentCollection);

    return http.post("/test", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      // setErrorMessage(error.response.data);
    }).then((res) => {
      reset();
      console.log("on reset");
      console.log(res);
    });
  }

  function clg() {
    console.log(imageList);
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
                    <select name="" id="" value={currentCollection} onChange={e => setCurrentCollection(e.target.value)}>
                      {
                        collections.map(x =>
                          <option>{x.name}</option>
                        )
                      }
                    </select>
                  </div>
                  {/* <div onClick={deletePicture}> */}
                  <div onClick={clg}>
                    <BsFillTrashFill />
                  </div>
                </div>
                <Gallery images={imageList} margin={GALLERY_IMAGE_MARGIN} enableImageSelection={true} rowHeight={GALLERY_IMAGE_HEIGHT} onSelect={(index, img, el) => selectImg(index, img)} onClick={(e) => { openImageViewer(e) }} />
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
