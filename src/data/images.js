import { getImageSize } from 'react-image-size';

import COLLECTIONS from './collections';

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
      collections.push(image);
    }
  })

  return collections;
}

const images = createCollections();

export default images;