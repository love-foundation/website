import { directus, status, callApi } from '$lib/_directus';
import fakeResponse from '../../cypress/fixtures/hubs.js';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
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

	const hubData = hubs.data[0];
	if (hubData) {
		return {
			body: hubData
		};
	}

	return {
		status: 404
	};
};
