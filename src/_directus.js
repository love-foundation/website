import DirectusSDK from '@directus/sdk-js';

// Query all assets on staging/development, but only published on production

let status = process.env.NODE_ENV === "production" ? "published" : "published,under_review,draft";

export const directus = new DirectusSDK({
  url: process.env.DIRECTUS_URL,
  project: "_",
  token: process.env.DIRECTUS_TOKEN
});


export async function fetchItems(collection = "", fields = "", filter = {}, limit = -1) {

  try {
    let raw = await directus.getItems(collection, {
      fields: fields,
      filter: filter,
      limit: limit,
      status: status
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



