import { fetchItems } from '../../_directus';

export async function get(req, res, next) {
  const event = await fetchItems("events", "id, name, slug, poster.data.*, hubs.*.*, location, startdatetime, enddatetime, event_type, artists.artists_id.*.*, hero_background_color", {
    slug: req.params.slug
  });

  let artists = event[0].artists || [];
  if (event !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event.map(e => ({
      name: e.name,
      slug: e.slug,
      hub: e.hubs[0] ? e.hubs[0].hubs_id.city : null,
      starttime: e.startdatetime,
      endtime: e.enddatetime,
      category: e.event_type,
      location: e.location,
      imageUrl: e.poster ? e.poster.data.thumbnails[7].url : "placeholder_events.jpeg",
      heroColor: e.hero_background_color || null,
      artists: artists.map(artist => ({
        id: artist.artists_id.id,
        slug: artist.artists_id.slug,
        name: artist.artists_id.artist_name,
        imageUrl: artist.artists_id.image ? artist.artists_id.image.data.thumbnails[3].url : "placeholder_artists.jpeg"
      }))
    })


    )));
  } else {
    next();
  }
}
