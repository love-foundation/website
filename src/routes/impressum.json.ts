import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const pageContent = await directus()
		.items('pages')
		.readByQuery({
			fields: 'content.*.*.*',
			filter: {
				slug: 'impressum',
				status: {
					_in: status
				}
			}
		});

	const impressum = pageContent.data[0].content;
	if (impressum) {
		return {
			body: JSON.stringify(impressum)
		};
	}

	return {
		status: 404
	};
};
