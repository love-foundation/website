import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type projectData from '../../../fixtures/projects';
import type { ConvertedProjects } from './_types';

export const prerender = process.env.ADAPTER === 'node' ? false : true;

export const load = async () => {
	try {
		const projects = !process.env.USE_FIXTURES
			? await directus.request(
					readItems('projects', {
						fields: [
							'id',
							'name',
							{ main_image: ['*'] },
							'pillar',
							'slug',
							'location_country',
							{
								content: ['*', { image: ['*'], image_two: ['*'] }]
							},
							'hero_background_color'
						],
						filter: {
							status: {
								_in: status
							}
						}
					})
				)
			: ((await import('../../../fixtures/projects')) as unknown as typeof projectData);

		if (!projects) {
			throw new Error('No data returned from Directus');
		}

		const projectsData: ConvertedProjects[] = projects.reverse().map((project) => {
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
