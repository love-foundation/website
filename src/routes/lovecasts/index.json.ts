import { callApi, directus, status } from '$lib/_directus';
import fakeResponse from '../../../cypress/fixtures/lovecasts';
import type { RequestHandler } from '@sveltejs/kit';
import type { ConvertedLovecast } from './_types.js';

export const get: RequestHandler = async () => {
	const lovecasts = callApi
		? await directus()
				.items('lovecast')

				.readByQuery({
					fields: 'id, name_of_the_set, design, soundcloud_link',
					filter: {
						status: {
							_in: status
						}
					},
					limit: -1
				})
		: fakeResponse;

	const lovecastsData: ConvertedLovecast[] = lovecasts.data.reverse().map((lovecast) => {
		const { id, name_of_the_set, design, soundcloud_link } = lovecast;
		return {
			id,
			title: name_of_the_set,
			soundcloud: soundcloud_link,
			imageUrl: design ? `${import.meta.env.VITE_DIRECTUS_URL}assets/${design}` : null
		};
	});

	if (lovecastsData) {
		return {
			body: JSON.stringify(lovecastsData)
		};
	}

	return {
		status: 404
	};
};
