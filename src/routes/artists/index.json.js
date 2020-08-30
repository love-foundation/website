import { fetchItems } from '../../_directus';

import fakeResponse from '../../../cypress/fixtures/artists.js'


export async function get(req, res, next) {

	let artists;

	const callApi = process.env.NODE_ENV === 'production';

	if (callApi) {
		const artists = await fetchItems("artists", "id, slug, artist_name, image.data.*, current_location, type_of_art", {});

		if (artists !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					artists.map(artist => ({
						id: artist.id,
						slug: artist.slug,
						name: artist.artist_name,
						imageUrl: artist.image ? artist.image.data.thumbnails[8].url : "placeholder_artists.png",
						location: artist.current_location,
						category: artist.type_of_art
					}))
				)
			);
		} else {
			next();
		}
	} else {
		artists = fakeResponse;
		if (artists !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					artists.map(artist => ({
						...artist
					}))
				)
			);
		}
	}
}
