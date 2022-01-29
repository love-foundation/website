import { directus, status, callApi } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';

import fakeResponse from '../../../cypress/fixtures/about.js';

export const get: RequestHandler = async () => {
	const aboutPage = callApi
		? await directus()
				.items('pages')
				.readMany({
					fields: 'content.*.*.*',
					filter: {
						slug: 'about',
						status: {
							_in: status
						}
					}
				})
		: fakeResponse;
	const aboutPageContent = aboutPage.data[0].content;
	if (aboutPageContent) {
		return {
			body: aboutPageContent
		};
	}

	return {
		status: 404
	};
};
