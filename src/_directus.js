import DirectusSDK from '@directus/sdk-js';

export const directus = new DirectusSDK({
  url: process.env.DIRECTUS_URL,
  project: "_",
  token: process.env.DIRECTUS_TOKEN
});


export async function fetchItems(collection = "", fields = "", filter = {}) {

  try {
    let raw = await directus.getItems(collection, {
      fields: fields,
      filter: filter
    });
    const items = raw.data
    return items
  } catch (err) {
    console.log(err);
  }
<<<<<<< HEAD
=======
};

export async function fetchArtists() {
  try {
    let raw = await directus.getItems("artists", {
      fields: "id, artist_name, image.data.*, current_location, type_of_art"
    });
    const artists = raw.data
    return artists
  } catch(err) {
    console.log(err);
  }
};


>>>>>>> Adding the API call for the artists

};

export async function fetchFile(passedID) {
  try {
    let raw = await directus.getFile(passedID.toString())
    const file = raw.data
    return file
  } catch (err) {
    console.log(err);
  }
};



