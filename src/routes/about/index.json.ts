import { directus, status, callApi } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';
import fakeResponse from '../../../cypress/fixtures/about';

export const get: RequestHandler = async () => {
	const aboutPage = callApi
		? await directus()
				.items('pages')
				.readByQuery({
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
			body: JSON.stringify(aboutPageContent)
		};
	}

	return {
		status: 404
	};
};
