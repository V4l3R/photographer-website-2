function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

const COLLECTIONS = [
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
  ]

export default COLLECTIONS;