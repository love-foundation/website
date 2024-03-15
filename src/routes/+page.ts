import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { callApi, directus, status } from '$lib/_directus';
import fakeHubResponse from '../fixtures/hubs';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const hubs = callApi
			? await directus()
					.items('hubs')
					.readByQuery({
						fields: ['id', 'city', 'instagram', 'facebook'],
						filter: {
							active: true,
							status: {
								_in: status
							}
						}
					})
			: fakeHubResponse;

		return {
			hubs: hubs.data
		};
	} catch (apiError) {
		error(500, `Could not load homepage: ${apiError}`);
	}
};
