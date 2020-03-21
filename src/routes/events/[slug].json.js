import { fetchItems } from '../../_directus';

export async function get(req, res, next) {
  const event = await fetchItems("events", "id, name, poster.data.*", {
    id: req.params.slug
  });

  if (event !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  } else {
    next();
  }
}
