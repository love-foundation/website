import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const hubs = await directus.request(
			readItems('hubs', {
				fields: ['id', 'city', 'instagram', 'facebook'],
				filter: {
					active: { _eq: true },
					status: {
						_in: status
					}
				}
			})
		);

		return {
			hubs: hubs
		};
	} catch (apiError) {
		error(500, `Could not load homepage: ${apiError}`);
	}
};
