import DirectusSDK from '@directus/sdk-js';

export const directus = new DirectusSDK({
  url: "https://directus.love-foundation.club/",
  project: "_",
  token: process.env.DIRECTUS_TOKEN
});
