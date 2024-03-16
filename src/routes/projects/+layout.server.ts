import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';
import type { ConvertedProjects } from './_types';

export const prerender = true;

export const load = async () => {
	try {
		const projects = await directus()
			.items('projects')
			.readByQuery({
				fields: [
					'id',
					'name',
					'main_image.*',
					'pillar',
					'slug',
					'location_country',
					'content.*.*',
					'hero_background_color'
				],
				filter: {
					status: {
						_in: status
					}
				}
			});
		if (!projects.data) {
			throw new Error('No data returned from Directus');
		}

		const projectsData: ConvertedProjects[] = projects.data.reverse().map((project) => {
			const {
				id,
				name,
				pillar,
				location_country,
				main_image,
				slug,
				content,
				hero_background_color
			} = project;
			return {
				id,
				name: name ?? 'No project name defined',
				pillar: pillar ?? 'No pillar defined',
				slug,
				country: location_country ?? 'No country defined',
				imageUrl: main_image ? `${import.meta.env.VITE_DIRECTUS_URL}assets/${main_image.id}` : '',
				content,
				heroColor: hero_background_color
			};
		});
		if (projectsData) {
			return {
				projects: projectsData
			};
		}
	} catch (apiError) {
		error(500, `Could not load impressum: ${apiError}`);
	}
};
