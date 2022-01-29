import { fetchItems } from '$lib/_directus';

import fakeResponse from '../../../cypress/fixtures/lovecasts.js';

const callApi = import.meta.env.NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'staging';

let lovecasts;

export async function get(req, res, next) {
	if (callApi) {
		lovecasts = await fetchItems('lovecast', 'id, name_of_the_set, design, soundcloud_link', {
			status: 'published'
		});

		if (lovecasts !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					lovecasts.map((lovecast) => ({
						id: lovecast.id,
						title: lovecast.name_of_the_set,
						imageUrl: lovecast.design
							? import.meta.env.VITE_DIRECTUS_URL +
							  'assets/' +
							  lovecast.design +
							  '?key=event-poster'
							: 'placeholder_lovecasts.png',
						soundcloud: lovecast.soundcloud_link
					}))
				)
			);
		} else {
			next();
		}
	} else {
		lovecasts = fakeResponse;

		if (lovecasts !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					lovecasts.map((lovecast) => ({
						...lovecast
					}))
				)
			);
		} else {
			next();
		}
	}
}
