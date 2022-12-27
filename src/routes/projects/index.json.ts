import type { Projects } from '$lib/types.js';
import { directus, status, callApi } from '$lib/_directus';
import type { PartialItem } from '@directus/sdk';
import type { RequestHandler } from '@sveltejs/kit';
import fakeResponse from '../../fixtures/projects';
import type { ConvertedProjectForIndex } from './_types.js';

export const get: RequestHandler = async () => {
	const projects = callApi
		? await directus()
				.items('projects')
				.readByQuery({
					fields: 'id, name, main_image.*.*, pillar, slug, location_country',
					filter: {
						status: {
							_in: status
						}
					}
				})
		: fakeResponse;

	const projectsData: ConvertedProjectForIndex[] = projects.data.reverse().map((project) => {
		const { id, name, pillar, location_country, main_image, slug } = project;
		return {
			id,
			name,
			pillar,
			slug,
			country: location_country,
			imageUrl: main_image ? `${import.meta.env.VITE_DIRECTUS_URL}assets/${main_image.id}` : null
		};
	});

	if (projectsData) {
		return {
			body: JSON.stringify(projectsData)
		};
	}

	return {
		status: 404
	};
};
