import { directus, status, callApi } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';
import fakeResponse from '../../fixtures/artists';
import type { convertedIndexArtist } from './_types.js';

export const get: RequestHandler = async () => {
	const artists = callApi
		? await directus()
				.items('artists')
				.readByQuery({
					fields: 'id, slug, artist_name, image.data.*, current_location, type_of_art',
					filter: {
						status: {
							_in: status
						}
					},
					limit: -1
				})
		: fakeResponse;

	const artistsData: convertedIndexArtist[] = artists.data.map((artist) => {
		const { id, slug, artist_name, image, current_location, type_of_art } = artist;
		return {
			id,
			slug,
			name: artist_name,
			imageUrl: image
				? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + image + '?key=artist-square'
				: 'placeholder_artists.png',
			location: current_location,
			category: type_of_art
		};
	});

	if (artistsData) {
		return {
			body: JSON.stringify(artistsData)
		};
	}

	return {
		status: 404
	};
};
