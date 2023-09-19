import { getImageSize } from 'react-image-size';

import COLLECTIONS, { resetColl } from './collections';

async function fetchImageSize(path) {
 try {
  const dimensions = await getImageSize(path);
  return dimensions;
 } catch (error) {
  console.error(error);
 }
}

function createCollections() {
 const collections = [];

 COLLECTIONS.forEach((element) => {
  for (var key in element.collection) {
   const image = {};

   var value = element.collection[key];
   image.src = value;
   const dimensions = fetchImageSize(value);
   image.width = dimensions.width;
   image.height = dimensions.height;
   image.collectionName = element.name;
   image.isSelected = false;
   collections.push(image);
  }
 });

 return collections;
}

export function createCollection(collection) {
 const album = [];
 // console.log("on a comme collection :");
 // console.log(collection);

 // console.log("On est dans createCollection, avec pour collection : ");
 // console.log(collection);

 collection?.pictures?.forEach((picture, index) => {
  const image = {};

  // var path = element.collection[key];
  // var path = picture.path;
  // var path = 'http://localhost:3001/'.concat(picture.path);
  // var path = '/static/media/woman.85d5b6e726b942f6d6ac.png';
  // var path = '../../../../photographer-website-back/albums/Collection%201/1.png';

  console.log('on passe dans pic');
  var path = 'data:image/png;base64, '.concat(picture.base64);
  image.src = path;
  image.id = index;
  // const dimensions = fetchImageSize(path);
  const dimensions = {};
  image.width = dimensions.width;
  image.height = dimensions.height;
  // image.collectionName = "2";
  image.collectionName = collection.albumName;

  // const picName = removeExtFromName(picture.name);
  const picName = picture.name;
  image.customOverlay = (
   <div className="h-full flex items-end">
    <div className="whitespace-nowrap overflow-ellipsis overflow-clip">
     {picName}
    </div>
   </div>
  );
  // image.caption = picName;

  image.isSelected = false;
  album.push(image);
 });

 // console.log("on retourne l'album : ");
 // console.log(album);

 return album;
}

// let images = createCollections();
// export default images;

export function reset() {
 // resetColl();
 // images = createCollections();
}

function removeExtFromName(picName) {
 const array = picName.split('.');
 array.pop();
 return array.length > 0 ? array.join('.') : picName;
}
