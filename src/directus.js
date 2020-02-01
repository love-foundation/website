import DirectusSDK from '@directus/sdk-js';

export const directus = new DirectusSDK({
  url: "https://directus.love-foundation.club/",
  project: "_",
  token: process.env.DIRECTUS_TOKEN
});

export async function fetchEvents() {
  try {
    let raw = await directus.getItems("events");
    const events = raw.data
    return events;

  } catch(err) {
    console.log(err);
  }
};


