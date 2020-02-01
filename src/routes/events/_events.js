import { directus } from '../../directus';

export default async function fetchEvents() {
  try {
    let raw = await directus.getItems("events");
    const events = raw.data
    return events;
  } catch(err) {
    console.log(err);
  }
};



