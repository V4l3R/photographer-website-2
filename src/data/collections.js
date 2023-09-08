function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

let COLLECTIONS = [
  // {
  //   name: "Collection 1",
  //   path: "../../photographer-website-back/albums/default/",
  //   collection: importAll(require.context('../../../photographer-website-back/albums/collection%201/', false, /\.(png|jpe?g|svg)$/))
  // },
  // {
  //   name: "Printemps",
  //   path: "../../photographer-website-back/albums/printemps/",
  //   collection: importAll(require.context('../../../photographer-website-back/albums/printemps/', false, /\.(png|jpe?g|svg)$/))
  // },
  // {
  //   name: "Vacances d'été en Italie",
  //   path: "../../photographer-website-back/albums/vacances italie/",
  //   collection: importAll(require.context('../../../photographer-website-back/albums/vacances%20italie/', false, /\.(png|jpe?g|svg)$/))
  // },
  // {
  //   name: "Petits chats",
  //   path: "../../photographer-website-back/albums/kitties/",
  //   collection: importAll(require.context('../../../photographer-website-back/albums/kitties/', false, /\.(png|jpe?g|svg)$/))
  // },
  // {
  //   name: "Test",
  //   path: "../../photographer-website-back/albums/test/",
  //   collection: importAll(require.context('../../../photographer-website-back/albums/test/', false, /\.(png|jpe?g|svg)$/))
  // },
  {
    name: "Collection 1",
    path: "../img/collections/default/",
    collection: importAll(require.context('../img/collections/default/', false, /\.(png|jpe?g|svg)$/))
  },
  {
    name: "Printemps",
    path: "../img/collections/printemps/",
    collection: importAll(require.context('../img/collections/printemps/', false, /\.(png|jpe?g|svg)$/))
  },
  {
    name: "Vacances d'été en Italie",
    path: "../img/collections/vacances italie/",
    collection: importAll(require.context('../img/collections/vacances italie/', false, /\.(png|jpe?g|svg)$/))
  },
  {
    name: "Petits chats",
    path: "../img/collections/kitties/",
    collection: importAll(require.context('../img/collections/kitties/', false, /\.(png|jpe?g|svg)$/))
  },
  {
    name: "Test",
    path: "../img/collections/test/",
    collection: importAll(require.context('../img/collections/test/', false, /\.(png|jpe?g|svg)$/))
  },
]

export function resetColl() {
  COLLECTIONS = [
    // {
    //   name: "Collection 1",
    //   path: "../../photographer-website-back/albums/default/",
    //   collection: importAll(require.context('../../../photographer-website-back/albums/Collection%201/', false, /\.(png|jpe?g|svg)$/))
    //   // collection: importAll(require.context('../../../photographer-website-back/albums/printemps/', false, /\.(png|jpe?g|svg)$/))
    //   // collection: importAll(require.context('../../../photographer-website-back/albums/kitties/', false, /\.(png|jpe?g|svg)$/))
    // },
    // {
    //   name: "Printemps",
    //   path: "../../photographer-website-back/albums/printemps/",
    //   collection: importAll(require.context('../../../photographer-website-back/albums/Printemps/', false, /\.(png|jpe?g|svg)$/))
    // },
    // {
    //   name: "Vacances d'été en Italie",
    //   path: "../../photographer-website-back/albums/vacances italie/",
    //   collection: importAll(require.context("../../../photographer-website-back/albums/Vacances%20d'%C3%A9t%C3%A9%20en%20Italie/", false, /\.(png|jpe?g|svg)$/))
    // },
    // {
    //   name: "Petits chats",
    //   path: "../../photographer-website-back/albums/kitties/",
    //   collection: importAll(require.context('../../../photographer-website-back/albums/Petits%20chats/', false, /\.(png|jpe?g|svg)$/))
    // },
    // {
    //   name: "Test",
    //   path: "../../photographer-website-back/albums/test/",
    //   collection: importAll(require.context('../../../photographer-website-back/albums/Test/', false, /\.(png|jpe?g|svg)$/))
    // },
  ]
}

// resetColl();

export default COLLECTIONS;