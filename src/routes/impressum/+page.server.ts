import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const pageContent = await directus.request(
			readItems('pages', {
				fields: [
					{
						content: ['*', { image: ['*'], image_two: ['*'] }]
					}
				],
				filter: {
					slug: { _eq: 'impressum' },
					status: {
						_in: status
					}
				}
			})
		);
		if (pageContent.length === 1) {
			return {
				impressum: pageContent[0].content
			};
		}
	} catch (apiError) {
		error(500, `Could not load impressum: ${apiError}`);
	}
};
