import { callApi, directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';

//FIX ME: This should have a fakeResponse from a fixture for the specific join page
import fakeResponse from '../../../../cypress/fixtures/join.js';

export const get: RequestHandler = async () => {
	const pageContent = callApi
		? await directus()
				.items('pages')
				.readMany({
					fields: 'content.*.*.*',
					filter: {
						slug: 'join',
						status: {
							_in: status
						}
					}
				})
		: fakeResponse;

	const joinPage = pageContent.data[0].content;
	if (joinPage) {
		return {
			body: JSON.stringify(joinPage)
		};
	}

	return {
		status: 404
	};
};
