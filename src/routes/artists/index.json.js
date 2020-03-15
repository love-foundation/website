import { fetchArtists } from '../../_directus';


export async function get(req, res, next) {
  const artists = await fetchArtists();

  if (artists !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
			JSON.stringify(
				artists.map(artist => ({
					id: artist.id,
					name: artist.artist_name,
					imageUrls: artist.image ? artist.image.data.thumbnails[3].url : "placeholder_artists.jpeg",
					location: artist.current_location,
					category: artist.type_of_art
				}))
			)
		);
  } else {
		next();
  }
}

