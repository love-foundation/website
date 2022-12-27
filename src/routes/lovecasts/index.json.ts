import { callApi, directus, status } from '$lib/_directus';
import fakeResponse from '../../fixtures/lovecasts';
import type { RequestHandler } from '@sveltejs/kit';
import type { ConvertedLovecast } from './_types.js';

const episodeNumberRegex = /(\w+cast)\s+(\d{1,4})/i;

export const get: RequestHandler = async () => {
	const lovecasts = callApi
		? await directus()
				.items('lovecast')
				.readByQuery({
					fields: 'id, name_of_the_set, design, soundcloud_link, type',
					filter: {
						status: {
							_in: status
						}
					},
					limit: -1
				})
		: fakeResponse;

	const lovecastsData: ConvertedLovecast[] = lovecasts.data
		.map((lovecast) => {
			const { id, name_of_the_set, design, soundcloud_link, type } = lovecast;
			const [_, regexCastType, episodeNumber] = name_of_the_set.match(episodeNumberRegex);
			return {
				id,
				title: name_of_the_set,
				soundcloud: soundcloud_link,
				imageUrl: design ? `${import.meta.env.VITE_DIRECTUS_URL}assets/${design}` : null,
				type,
				regexCastType,
				episodeNumber: parseInt(episodeNumber, 10)
			};
		})
		.sort((a, b) => {
			return b.regexCastType.localeCompare(a.regexCastType) || b.episodeNumber - a.episodeNumber;
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
