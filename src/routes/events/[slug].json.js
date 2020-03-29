import { fetchItems } from '../../_directus';

export async function get(req, res, next) {
  const event = await fetchItems("events", "id, name, poster.data.*, hubs.*.*, location, startdatetime, enddatetime, event_type, artists.artists_id.*.*", {
    id: req.params.slug
  });

  if (event !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event.map(e => ({
      name: e.name,
      hub: e.hubs[0] ? e.hubs[0].hubs_id.city : null,
      starttime: e.startdatetime,
      endtime: e.enddatetime,
      category: e.event_type,
      location: e.location,
      imageUrls: e.poster.data,
      artists_full: e.artists,
      artists: e.artists.map(artist => ({
        id: artist.artists_id.id,
        name: artist.artists_id.artist_name,
        imageUrls: artist.artists_id.image.data
      }))
    })


    )));
  } else {
    next();
  }
}
