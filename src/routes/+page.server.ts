import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const hubs = await directus()
			.items('hubs')
			.readByQuery({
				fields: ['id', 'city', 'instagram', 'facebook'],
				filter: {
					active: true,
					status: {
						_in: status
					}
				}
			});

		return {
			hubs: hubs.data
		};
	} catch (apiError) {
		error(500, `Could not load homepage: ${apiError}`);
	}
};
