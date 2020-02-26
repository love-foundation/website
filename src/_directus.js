import DirectusSDK from '@directus/sdk-js';

export const directus = new DirectusSDK({
  url: process.env.DIRECTUS_URL,
  project: "_",
  token: process.env.DIRECTUS_TOKEN
});


export async function fetchEvents() {
  try {
    let raw = await directus.getItems("events", {
      fields: "id, name, poster.data.*",
      filter: {
        on_website: 1
      }
    });
    const events = raw.data
    return events
  } catch(err) {
    console.log(err);
  }
};


export async function fetchEvent(passedId) {
  try {
    let raw = await directus.getItems("events", {
      fields: "id, name, poster.data.*",
      filter: {
        id: passedId
      }
    });
    const event = raw.data
    return event
  } catch(err) {
    console.log(err);
  }
};




