import type { ContentCollection } from '$lib/types';
import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (): Promise<unknown> => {
	const pageContent = await directus()
		.items('pages')
		.readMany({
			fields: 'content.*.*.*',
			filter: {
				slug: 'privacy-policy',
				status: {
					_in: status
				}
			}
		});

	const privacyPolicy = pageContent.data[0].content;
	if (privacyPolicy) {
		return {
			body: privacyPolicy
		};
	}

	return {
		status: 404
	};
};
