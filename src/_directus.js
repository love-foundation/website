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



