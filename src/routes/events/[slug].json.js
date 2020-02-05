  import { fetchEvent } from '../../_directus';

  export async function get(req, res, next) {
    console.log(req.params.id);
    const event = await fetchEvent(req.params.slug);

    if (event !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(event));
    } else {
      next();
    }
  }
