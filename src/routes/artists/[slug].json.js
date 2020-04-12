import { fetchItems } from '../../_directus';

export async function get(req, res, next) {
  const artist = await fetchItems("artists", "id, artist_name, image.data.*, current_location, type_of_art, events.events_id.*.*.*, soundcloud_url, facebook_url, level_of_involvement, hero_background_color", {
    id: req.params.slug
  });

  if (artist !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(artist.map(a => ({
      name: a.artist_name,
      image: a.image.data.thumbnail[8].url,
      status: a.level_of_involvement,
      location: a.current_location,
      category: a.type_of_art,
      facebook: a.facebook_url,
      soundcloud: a.soundcloud_url,
      heroColor: a.hero_background_color  || null,
      events: a.events.map(event => ({
        id: event.events_id.id,
        title: event.events_id.name,
        imageUrl: event.events_id.poster ? event.events_id.poster.data.thumbnail[7] : "placeholder_artists.jpeg",
        hub: event.events_id.hubs[0] ? event.events_id.hubs[0].hubs_id.city : null
      }))
    })
    )));
  } else {
    next();
  }
}
