import React, { useContext } from 'react';

import {
 ImFacebook,
 ImTwitter,
 ImPinterest,
 ImInstagram,
 ImYoutube,
} from 'react-icons/im';
import { CursorContext } from '../context/CursorContext';

import {
 FACEBOOK_URL,
 TWITTER_URL,
 INSTAGRAM_URL,
 PINTEREST_URL,
 YOUTUBE_URL,
} from '../data/constantes';
import { SettingsContext } from '../context/SettingsContext';

const Socials = () => {
 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
 const { facebookUrl, twitterUrl, instagramUrl, pinterestUrl, youtubeUrl } =
  useContext(SettingsContext);

 return (
  <div
   onMouseEnter={mouseEnterHandler}
   onMouseLeave={mouseLeaveHandler}
   className="hidden lg:flex ml-12 xl:ml-20"
  >
   <ul className="flex gap-x-6 pr-[2.7vw]">
    <li>
     {/* <a href={FACEBOOK_URL} target='_blank'> */}
     <a href={facebookUrl} target="_blank">
      <ImFacebook />
     </a>
    </li>
    <li>
     <a href={twitterUrl} target="_blank">
      <ImTwitter />
     </a>
    </li>
    <li>
     <a href={instagramUrl} target="_blank">
      <ImInstagram />
     </a>
    </li>
    <li>
     <a href={pinterestUrl} target="_blank">
      <ImPinterest />
     </a>
    </li>
    {/* <li>
          <a href={youtubeUrl} target='_blank'>
            <ImYoutube />
          </a>
        </li> */}
   </ul>
  </div>
 );
};

export default Socials;
