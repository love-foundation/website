import type { MyCollections } from '$lib/types';
import { Directus, PartialItem } from '@directus/sdk';

// Query all assets on staging/development, but only published on production

export const status =
	process.env.NODE_ENV === 'production' ? ['published'] : ['published', 'under_review', 'draft'];
export const directus = new Directus<MyCollections>(process.env.DIRECTUS_URL, {
	auth: { staticToken: process.env.DIRECTUS_TOKEN }
});

export async function fetchItems(
	collection = '',
	fields = '',
	filter = {},
	limit = -1
): Promise<PartialItem<unknown>[]> {
	const filters = {
		...filter,
		status: {
			_in: status
		}
	};
	try {
		const raw = await directus.items(collection).readMany({
			fields: fields,
			filter: filters,
			limit: limit
		});
		const items = raw.data;
		return items;
	} catch (err) {
		console.log(err);
	}
}
