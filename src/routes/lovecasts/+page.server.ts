import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import type { ConvertedLovecast } from './_types';

const episodeNumberRegex = /(\w+cast)\s+(\d{1,4})/i;

export const load = async () => {
	const lovecasts = await directus.request(
		readItems('lovecast', {
			fields: ['id', 'name_of_the_set', 'design', 'soundcloud_link', 'type'],
			filter: {
				status: {
					_in: status
				}
			},
			limit: -1
		})
	);

	if (!lovecasts) {
		throw new Error('No lovecasts found');
	}

	const lovecastsData: ConvertedLovecast[] = lovecasts
		.map((lovecast) => {
			const { id, name_of_the_set, design, soundcloud_link, type } = lovecast;
			const [_, regexCastType, episodeNumber] = name_of_the_set?.match(episodeNumberRegex) ?? [];
			return {
				id,
				title: name_of_the_set ?? 'No lovecast name defined',
				soundcloud: soundcloud_link ?? 'https://soundcloud.com/love-foundation',
				imageUrl: design ? `${import.meta.env.VITE_DIRECTUS_URL}assets/${design}` : '',
				type: type ?? 'No type',
				regexCastType,
				episodeNumber: parseInt(episodeNumber, 10)
			};
		})
		.sort((a, b) => {
			return b.regexCastType.localeCompare(a.regexCastType) || b.episodeNumber - a.episodeNumber;
		});

	if (lovecastsData) {
		return {
			lovecasts: lovecastsData
		};
	}
};
