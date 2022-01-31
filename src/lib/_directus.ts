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
