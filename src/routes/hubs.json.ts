import { fetchItems } from '../_directus';

import fakeResponse from '../../cypress/fixtures/hubs.js';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	let hubs;
	const callApi = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

	if (callApi) {
		hubs = await fetchItems('hubs', 'id, city, instagram, facebook', {
			active: 1
		});
	} else {
		hubs = fakeResponse;
	}

	if (hubs) {
		return {
			body: hubs
		};
	}

	return {
		status: 404
	};
};
