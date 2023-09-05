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

    // console.log("on a comme element : ");
    // console.log(element);
    // console.log("on a comme collection : ");
    // console.log(element.collection);

    for (var key in element.collection) {

      // console.log("on a comme image : ");
      // console.log(element.collection[key]);

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
  })

  return collections;
}

function createCollection(collection) {
  
}

let images = createCollections();

export function reset() {
  resetColl();
  images = createCollections();
}

export default images;