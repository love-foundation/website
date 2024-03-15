import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const pageContent = await directus()
			.items('pages')
			.readByQuery({
				fields: ['content.*.*'],
				filter: {
					slug: 'impressum',
					status: {
						_in: status
					}
				}
			});
		if (pageContent.data?.length === 1) {
			return {
				impressum: pageContent.data[0].content
			};
		}
	} catch (apiError) {
		throw error(500, `Could not load impressum: ${apiError}`);
	}
};
