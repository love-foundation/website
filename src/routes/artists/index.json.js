import { fetchItems } from '../../_directus';

export async function get(req, res, next) {
<<<<<<< HEAD
	const artists = await fetchItems("artists", "id, slug, artist_name, image.data.*, current_location, type_of_art", {});
=======
	const artists = await fetchItems("artists", "id, slug, artist_name, image.data.*, current_location, type_of_art", {}, 20);
>>>>>>> Swapping out id for slug for artists

	if (artists !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify(
				artists.map(artist => ({
					id: artist.id,
					slug: artist.slug,
					name: artist.artist_name,
					imageUrl: artist.image ? artist.image.data.thumbnails[8].url : "placeholder_artists.jpeg",
					location: artist.current_location,
					category: artist.type_of_art
				}))
			)
		);
	} else {
		next();
	}
}

