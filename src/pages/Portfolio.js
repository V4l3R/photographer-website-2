import React, { useContext, useState, useCallback, useRef } from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

// import { ImageViewer } from "react-image-viewer-dv";
import ImageViewer from 'react-simple-image-viewer';
// import ImagesViewer from 'react-images-viewer';
import { Gallery } from "react-grid-gallery";

import { transition1 } from '../transitions';
import { CursorContext } from '../context/CursorContext';

import GalleryList from '../components/GalleryList';

import collections from '../data/collections';

import images from '../data/images';

import { DEFAULT_COLLECTION, GALLERY_IMAGE_HEIGHT, GALLERY_IMAGE_MARGIN } from '../data/constantes';

const Portfolio = () => {

  const { mouseEnterHandler, mouseLeaveHandler, mouseDisappearHandler, mouseQuitHandler } = useContext(CursorContext);
  const [currentCollection, setCurrentCollection] = useState(DEFAULT_COLLECTION);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imageHeight, setImageHeight] = useState(200);

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
  // const imageListSrc = imageList.filter(function(item) { return item.src; })

  const changeCollection = (e) => {
    setCurrentCollection(e.target.innerText);
  }

  const showIndex = (e) => {
    console.log(e);
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const widthWindow = useRef([window.innerWidth]);
  // widthWindow.current[0] < 700 ? setImageHeight('20vw') : setImageHeight(200);

  const calcImageHeight = () => {
    console.log('largeur de la fenetre');
    console.log(widthWindow.current[0]);
    return widthWindow.current[0] < 700 ? '20vw' : 200;
    // return '20vw';
  }

  return (
    <>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition1} onMouseEnter={mouseDisappearHandler} onMouseLeave={mouseLeaveHandler} className='section'>

        {/* </div> */}
        {/* <div style={{ backgroundColor: 'grey', border: 'solid'}}> */}
        <h1 className='h1 pt-24 text-6xl container mx-auto pl-56'>Mes créations</h1>
        <div style={{ backgroundColor: 'white' }} className='mx-auto h-[75vh] w-[90vw] pt-6'>
          {/* <div className='flex flex-col lg:flex-row h-full w-full items-center justify-start gap-x-24 text-center lg:text-left pt-24 lg:pt-36 pb-8'> */}
          <div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} className='grid grid-cols-12 grid-flow-col gap-y-40 h-[75vh]' >
            <div className='hidden xl:block h-full xl:col-span-2 bg-slate-200 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-thumb-gray-900 scrollbar-track-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full' >
              <motion.div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} className='h-full col-span-2'>
                <GalleryList collection={collections} collectionHandler={changeCollection} />
              </motion.div>
            </div>
            <div className='col-span-1 xl:hidden bg-red-600'>

            </div>
            {/* rounded-2xl border-8 border-slate-100 */}
            <div className='ml-2 h-full col-span-11 xl:col-span-10 overflow-y-scroll scrollbar scrollbar-w-3 scrollbar-thumb-gray-900 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-slate-100'>
              <motion.div initial={{ opacity: 0, y: '80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '80%' }} transition={transition1}>
                <Gallery images={imageList} margin={GALLERY_IMAGE_MARGIN} enableImageSelection={false} rowHeight={GALLERY_IMAGE_HEIGHT} onClick={(e) => { openImageViewer(e) }} />

                {/* <ImagesViewer imgs={imageList} /> */}

                {/* {imageList.map((element, index) => (
                  <img
                    src={element.src}
                    onClick={() => openImageViewer(index)}
                    width="300"
                    key={index}
                    style={{ margin: '2px' }}
                    alt=""
                  />
                ))} */}

              </motion.div>
            </div>
            <div className=''>
              {/* </div> */}
              {/* <motion.div initial={{ opacity: 0, y: '-80%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-80%' }} transition={transition1} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='flex flex-col lg:items-start'>
            <h1 className='h1'>Portfolio</h1>
            <p className='mb-12 max-w-sm'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Adipisci, fugit sit quam reiciendis veniam,
            modi quis dolorem necessitatibus minus ipsum
            Aa ratione, possimus facilis? Eaque totam dignissimos
              enim repellendus at?
              <br />
              <br />
              Nostrum magnam totam tempora enim 
              dolorem quisquam cupiditate tenetur. 
              Cumque veritatis.
              </p>
              <Link to={'/contact'} className='btn mb-[30px] mx-auto lg:mx-0'>Contact</Link>
              </motion.div>
              <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='grid grid-cols-2 lg:gap-2 max-h-[80vh]'>
              <div className='max-w-[250px] lg:max-w-[320px] h-[187px] lg:h-[220px] bg-accent overflow-hidden'>
              <img className='object-cover h-full lg:h-[220px] hover:scale-110 transition-all duration-500' src={Img1} alt='' />
              </div>
            <div className='max-w-[250px] lg:max-w-[320px] h-[187px] lg:h-[220px] bg-accent overflow-hidden'>
            <img className='object-cover h-full lg:h-[220px] hover:scale-110 transition-all duration-500' src={Img2} alt='' />
            </div>
            <div className='max-w-[250px] lg:max-w-[320px] h-[187px] lg:h-[220px] bg-accent overflow-hidden'>
            <img className='object-cover h-full lg:h-[220px] hover:scale-110 transition-all duration-500' src={Img3} alt='' />
            </div>
            <div className='max-w-[250px] lg:max-w-[320px] h-[187px] lg:h-[220px] bg-accent overflow-hidden'>
              <img className='object-cover h-full lg:h-[220px] hover:scale-110 transition-all duration-500' src={Img4} alt='' />
            </div> */}
            </div>
          </div>
        </div>
        {/* {isViewerOpen && (
          <div className='z-40'>
            <ImageViewer
              src={imageList}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          </div>
        )} */}
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
