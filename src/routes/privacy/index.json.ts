import type { ContentCollection } from '$lib/types';
import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (): Promise<unknown> => {
	const pageContent = await directus()
		.items('pages')
		.readMany({
			fields: 'content.*.*.*',
			filter: {
				slug: 'privacy-policy',
				status: {
					_in: status
				}
			}
		});

	const privacyPolicy = pageContent.data.flatMap((item) => {
		const content: ContentCollection = item.content[0]; //We know there is only one content item here.
		return {
			id: content.id,
			type: content.type,
			text: content.text,
			textLayout: content.text_layout,
			imageOne: content.image,
			imageTwo: content.image_two,
			padding: content.distance_to_next,
			captions: content.captions,
			heroColor: content.hero_background_color || null
		};
	});
	if (privacyPolicy) {
		return {
			body: privacyPolicy
		};
	}

	return {
		status: 404
	};
};
