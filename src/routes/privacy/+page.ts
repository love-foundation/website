import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	try {
		const pageContent = await directus()
			.items('pages')
			.readByQuery({
				fields: ['content.*.*'],
				filter: {
					slug: 'privacy-policy',
					status: {
						_in: status
					}
				}
			});
		if (pageContent.data?.length === 1) {
			return {
				privacyPolicy: pageContent.data[0].content
			};
		}
	} catch (apiError) {
		throw error(500, `Could not load impressum: ${apiError}`);
	}
};
