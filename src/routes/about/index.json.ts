import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';

import fakeResponse from '../../../cypress/fixtures/about.js';

export const get: RequestHandler = async () => {
	const callApi =
		import.meta.env.NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'staging';
	if (callApi) {
		const aboutPage = await directus()
			.items('pages')
			.readMany({
				fields: 'content.*.*.*',
				filter: {
					slug: 'about',
					status: {
						_in: status
					}
				}
			});

		const aboutPageContent = aboutPage.data[0].content;
		if (aboutPageContent) {
			return {
				body: aboutPageContent
			};
		}

		return {
			status: 404
		};
	} else {
		return { body: JSON.stringify(fakeResponse) };
	}
};
