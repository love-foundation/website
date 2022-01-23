import { directus, status } from '$lib/_directus';

import fakeResponse from '../../cypress/fixtures/hubs.js';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const callApi = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

	const hubs = callApi
		? await directus()
				.items('hubs')
				.readMany({
					fields: 'id, city, instagram, facebook',
					filter: {
						active: true,
						status: {
							_in: status
						}
					}
				})
		: fakeResponse;
	if (hubs) {
		return {
			body: hubs
		};
	}

	return {
		status: 404
	};
};
