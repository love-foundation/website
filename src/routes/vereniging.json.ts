import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const pageContent = await directus()
		.items('pages')
		.readByQuery({
			fields: 'content.*.*.*',
			filter: {
				slug: 'vereniging-love-foundation',
				status: {
					_in: status
				}
			}
		});

	const verenigingPage = pageContent.data[0].content;
	if (verenigingPage) {
		return {
			body: JSON.stringify(verenigingPage)
		};
	}

	return {
		status: 404
	};
};
