import { callApi, directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';
import type { ConvertedSingleProject } from './_types';

export const get: RequestHandler = async ({ params }) => {
	const project = await directus()
		.items('projects')
		.readByQuery({
			fields: 'content.*.*.*, name, main_image.*.*, hero_background_color',
			filter: {
				slug: params.slug,
				status: {
					_in: status
				}
			}
		});

	const projectData: ConvertedSingleProject[] = project.data.flatMap((project) => {
		const { name, main_image, content, hero_background_color } = project;
		return {
			name,
			heroColor: hero_background_color,
			content,
			imageUrl: main_image ? `${import.meta.env.VITE_DIRECTUS_URL}assets/${main_image.id}` : null
		};
	});

	if (projectData) {
		return {
			body: JSON.stringify(projectData)
		};
	}

	return {
		status: 404
	};
};
