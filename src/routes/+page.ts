import { callApi, directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';
import fakeHubResponse from '../../fixtures/hubs';
import type { PageLoad } from './$types';

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
