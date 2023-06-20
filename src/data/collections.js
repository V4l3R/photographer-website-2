function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

const COLLECTIONS = [
    {
      name: "Collection 1",
      path: "../img/portfolio/collections/default/",
      collection: importAll(require.context('../img/portfolio/collections/default/', false, /\.(png|jpe?g|svg)$/))
    },
    {
      name: "Printemps",
      path: "../img/portfolio/collections/printemps/",
      collection: importAll(require.context('../img/portfolio/collections/printemps/', false, /\.(png|jpe?g|svg)$/))
    },
    {
      name: "Vacances d'été en Italie",
      path: "../img/portfolio/collections/vacances italie/",
      collection: importAll(require.context('../img/portfolio/collections/vacances italie/', false, /\.(png|jpe?g|svg)$/))
    },
    {
      name: "Petits chats",
      path: "../img/portfolio/collections/kitties/",
      collection: importAll(require.context('../img/portfolio/collections/kitties/', false, /\.(png|jpe?g|svg)$/))
    },
  ]

export default COLLECTIONS;