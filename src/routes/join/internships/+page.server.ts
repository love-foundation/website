import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const pageContent = await directus()
			.items('pages')
			.readByQuery({
				fields: ['content.*.*'],
				filter: {
					slug: 'join',
					status: {
						_in: status
					}
				}
			});
		if (pageContent.data?.length === 1) {
			return {
				join: pageContent.data[0].content
			};
		}
	} catch (apiError) {
		error(500, `Could not load impressum: ${apiError}`);
	}
};
