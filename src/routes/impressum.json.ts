import type { RequestHandler } from '@sveltejs/kit';
import { directus, status } from '../_directus';

export const get: RequestHandler = async () => {
	const pageContent = await directus()
		.items('pages')
		.readMany({
			fields: 'content.*.*.*',
			filter: {
				slug: 'impressum',
				status: {
					_in: status
				}
			}
		});

	const impressum = pageContent.data.flatMap((item) => {
		const content = item.content[0]; //We know there is only one content item here.
		return {
			id: content.id,
			type: content.type,
			details: {
				text: content.text,
				textLayout: content.text_layout,
				imageOne: content.image,
				imageTwo: content.image_two,
				padding: content.distance_to_next,
				captions: content.captions,
				heroColor: content.hero_background_color || null
			}
		};
	});
	if (impressum) {
		return {
			body: impressum
		};
	}

	return {
		status: 404
	};
};
