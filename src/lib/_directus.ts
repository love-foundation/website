import type { CustomDirectusTypes } from '$lib/types';
import { Directus, PartialItem } from '@directus/sdk';

export const callApi =
	import.meta.env.NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'staging';

// Query all assets on staging/development, but only published on production

export const status =
	import.meta.env.NODE_ENV === 'production'
		? ['published']
		: ['published', 'under_review', 'draft'];
const directusSDK = new Directus<CustomDirectusTypes>(
	import.meta.env.VITE_DIRECTUS_URL.toString(),
	{
		auth: { staticToken: import.meta.env.VITE_DIRECTUS_TOKEN.toString() }
	}
);

export const directus = (): Directus<CustomDirectusTypes> => directusSDK;

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
		const raw = await directusSDK.items(collection).readMany({
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
