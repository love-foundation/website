import { fetchItems } from '../../_directus';

export async function get(req, res, next) {
  const artist = await fetchItems("artists","id, artist_name, image.data.*, current_location, type_of_art", {
    id: req.params.slug
  });

  if (artist !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(artist));
  } else {
    next();
  }
}
