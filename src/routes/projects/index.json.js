import { fetchItems } from '$lib/_directus';

import fakeResponse from '../../../cypress/fixtures/projects.js';

const callApi = import.meta.env.NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'staging';

let projects;

export async function get(req, res, next) {
	if (callApi) {
		projects = await fetchItems(
			'projects',
			'id, name, main_image.*.*, pillar, slug, location_country',
			{}
		);
		if (projects !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					projects.map((project) => ({
						id: project.id,
						name: project.name,
						imageUrl: project.main_image
							? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + project.main_image.id
							: 'placeholder_projects.jpeg',
						pillar: project.pillar,
						country: project.location_country,
						slug: project.slug
					}))
				)
			);
		} else {
			next();
		}
	} else {
		projects = fakeResponse;

		if (projects !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					projects.map((project) => ({
						...project
					}))
				)
			);
		} else {
			next();
		}
	}
}
