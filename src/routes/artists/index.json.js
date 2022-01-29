import { fetchItems } from '$lib/_directus';

import fakeResponse from '../../../cypress/fixtures/artists.js';

export async function get(req, res, next) {
	let artists;

	const callApi =
		import.meta.env.NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'staging';

	if (callApi) {
		const artists = await fetchItems(
			'artists',
			'id, slug, artist_name, image.data.*, current_location, type_of_art',
			{}
		);

		if (artists !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					artists.map((artist) => ({
						id: artist.id,
						slug: artist.slug,
						name: artist.artist_name,
						imageUrl: artist.image
							? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + artist.image + '?key=artist-square'
							: 'placeholder_artists.png',
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
					artists.map((artist) => ({
						...artist
					}))
				)
			);
		}
	}
}
