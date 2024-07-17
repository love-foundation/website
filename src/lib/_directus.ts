import type { Schema } from '$lib/types';
import { createDirectus, rest, staticToken } from '@directus/sdk';

export const callApi = import.meta.env.MODE === 'production';

// Query all assets on staging/development, but only published on production
export const status =
	import.meta.env.VITE_APP_MODE === 'staging' || import.meta.env.MODE === 'development'
		? ['published', 'under_review', 'draft']
		: ['published'];
const directusSDK = createDirectus<Schema>(import.meta.env.VITE_DIRECTUS_URL.toString())
	.with(staticToken(import.meta.env.VITE_DIRECTUS_TOKEN.toString()))
	.with(rest());

export const directus = directusSDK;
