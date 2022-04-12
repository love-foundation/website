import type { CustomDirectusTypes } from '$lib/types';
import { Directus } from '@directus/sdk';

export const callApi = import.meta.env.MODE === 'production';

// Query all assets on staging/development, but only published on production
export const status =
	import.meta.env.VITE_APP_MODE === 'staging' || import.meta.env.MODE === 'development'
		? ['published', 'under_review', 'draft']
		: ['published'];
const directusSDK = new Directus<CustomDirectusTypes>(
	import.meta.env.VITE_DIRECTUS_URL.toString(),
	{
		auth: { staticToken: import.meta.env.VITE_DIRECTUS_TOKEN.toString() }
	}
);

export const directus = (): Directus<CustomDirectusTypes> => directusSDK;
