import React, { useContext, useState, useCallback } from 'react';


import { motion } from 'framer-motion';

import ImageViewer from 'react-simple-image-viewer';
import { Gallery } from "react-grid-gallery";

import { transition1 } from '../transitions';
import { CursorContext } from '../context/CursorContext';

import GalleryList from '../components/GalleryList';

import collections from '../data/collections';

import images from '../data/images';

import { DEFAULT_COLLECTION, GALLERY_IMAGE_HEIGHT, GALLERY_IMAGE_MARGIN } from '../data/constantes';

const Portfolio = () => {

  const { mouseEnterHandler, mouseLeaveHandler, mouseDisappearHandler } = useContext(CursorContext);
  const [currentCollection, setCurrentCollection] = useState(DEFAULT_COLLECTION);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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

  return (
    <>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition1} className='section'>
        <h1 onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='h1 pt-28 text-6xl container mx-auto pl-[10vw] xs:pl-[17vw] sm:pl-[20vw]'>Mes créations</h1>
        <div style={{ backgroundColor: 'white' }} onMouseEnter={mouseDisappearHandler} onMouseLeave={mouseLeaveHandler} className='mx-auto h-[75vh] w-[90vw] pt-4'>
          <div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} className='grid grid-cols-12 grid-flow-col gap-y-40 h-[75vh]' >
            <div className='xl:block h-full col-span-2 bg-slate-200 hover:w-[250px] xl:hover:w-auto hover:relative hover:z-50 overflow-y-scroll overflow-x-hidden scrollbar scrollbar-w-2 scrollbar-thumb-gray-900 scrollbar-track-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full' >
              <motion.div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} className='h-full col-span-2 text-[#696c6d]'>
                <GalleryList collection={collections} collectionHandler={changeCollection} />
              </motion.div>
            </div>
            <div className='ml-2 h-full col-span-11 xl:col-span-10 overflow-y-scroll scrollbar scrollbar-w-3 scrollbar-thumb-gray-900 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-slate-100'>
              <motion.div initial={{ opacity: 0, y: '80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '80%' }} transition={transition1}>
                <Gallery images={imageList} margin={GALLERY_IMAGE_MARGIN} enableImageSelection={false} rowHeight={GALLERY_IMAGE_HEIGHT} onClick={(e) => { openImageViewer(e) }} />
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
