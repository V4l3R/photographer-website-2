import React, { useState, useEffect, createContext } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
 // const [isAdmin, setIsAdmin] = useState(false);
 const [settings, setSettings] = useState([]);

 const [galleryImageHeight, setGalleryImageHeight] = useState([]);
 const [gallerySpacing, setGallerySpacing] = useState([]);

 const [facebookUrl, setFacebookUrl] = useState('');
 const [twitterUrl, setTwitterUrl] = useState('');
 const [instagramUrl, setInstagramUrl] = useState('');
 const [pinterestUrl, setPinterestUrl] = useState('');
 const [youtubeUrl, setYoutubeUrl] = useState('');

 useEffect(() => {
  // getSettingsContext();

  setGalleryImageHeight('200px');
  setGallerySpacing('4px');

  // initialize()
  return () => {};
 }, []);

 function initialize() {
  // getSettings().then(() => {
  //   setFacebookUrl(findSettingByName("facebookUrl").value);
  // })
 }

 function findSettingByName(settingName) {
  console.log('findSettingByName');
  console.log(settings);

  for (let i = 0; i < settings.length; i++) {
   const setting = settings[i];

   if (setting.name === settingName) {
    return setting;
   }
  }

  return null;
 }

 function findInSettingsByName(settings, settingName) {
  // console.log("findInSettingsByName");
  // console.log(settings);

  for (let i = 0; i < settings.length; i++) {
   const setting = settings[i];

   if (setting.name === settingName) {
    return setting;
   }
  }

  return null;
 }

 function getSettingsContext() {
  return fetch('/getSettings')
   .then((res) => res.json())
   .then((data) => {
    // console.log("getSettingsContext");
    // console.log(data);
    refreshSettings(data.settings);
    return data.settings;
    // setSettings(data.settings);
    // setTargetedSettingsName(data.settings[0].name);
    // setNewSettingValue(data.settings[0].value);
    // setAlbumsList(data.albumsName);
   });
 }

 function refreshSettings(settings) {
  // console.log("on met fb url : ");
  // console.log(findInSettingsByName(settings, "facebookUrl").value);
  // setFacebookUrl(findInSettingsByName(settings, "facebookUrl").value);

  for (let i = 0; i < settings.length; i++) {
   const setting = settings[i];

   if (setting.name === 'galleryImageHeight') {
    setGalleryImageHeight(setting.value);
   } else if (setting.name === 'gallerySpacing') {
    setGallerySpacing(setting.value);
   } else if (setting.name === 'facebookUrl') {
    setFacebookUrl(setting.value);
   } else if (setting.name === 'twitterUrl') {
    setTwitterUrl(setting.value);
   } else if (setting.name === 'instagramUrl') {
    setInstagramUrl(setting.value);
   } else if (setting.name === 'pinterestUrl') {
    setPinterestUrl(setting.value);
   } else if (setting.name === 'youtubeUrl') {
    setYoutubeUrl(setting.value);
   }
  }
 }

 const cursorVariants = {
  default: {
   // x: cursorPos.x - 16,
   // y: cursorPos.y - 16,
   // backgroundColor: '#0e1112',
  },
 };

 const mouseEnterHandler = () => {
  // setCursorBG('text');
 };

 return (
  <SettingsContext.Provider
   value={{
    galleryImageHeight,
    gallerySpacing,
    facebookUrl,
    twitterUrl,
    instagramUrl,
    pinterestUrl,
    youtubeUrl,
    getSettingsContext,
    settings,
    setSettings,
   }}
  >
   {children}
  </SettingsContext.Provider>
 );
};

export default SettingsProvider;
