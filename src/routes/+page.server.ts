import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		// The hubs fixture is a recorded REST response, so unwrap its `data` envelope
		// to match what `readItems` resolves to.
		const hubs = process.env.USE_FIXTURES
			? (await import('../../fixtures/hubs')).default.data
			: await directus.request(
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
