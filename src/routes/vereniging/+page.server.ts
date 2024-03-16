import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const pageContent = await directus()
			.items('pages')
			.readByQuery({
				fields: ['content.*.*'],
				filter: {
					slug: 'vereniging-love-foundation',
					status: {
						_in: status
					}
				}
			});
		if (pageContent.data?.length === 1) {
			return {
				vereniging: pageContent.data[0].content
			};
		}
	} catch (apiError) {
		error(500, `Could not load impressum: ${apiError}`);
	}
};
