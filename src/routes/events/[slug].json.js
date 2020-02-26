  import { fetchEvent } from '../../_directus';

  export async function get(req, res, next) {
    const event = await fetchEvent(req.params.slug);

    if (event !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(event));
    } else {
      next();
    }
  }


  // import events from './index.json'

  // console.log(events);