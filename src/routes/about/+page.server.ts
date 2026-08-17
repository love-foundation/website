import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

const fetchAboutPage = () =>
	directus.request(
		readItems('pages', {
			fields: [
				{
					content: ['*', { image: ['*'], image_two: ['*'] }]
				}
			],
			filter: {
				slug: { _eq: 'about' },
				status: {
					_in: status
				}
			}
		})
	);

type AboutPage = Awaited<ReturnType<typeof fetchAboutPage>>;

export const load = async () => {
	try {
		// The about fixture is a recorded REST response, so unwrap its `data` envelope
		// to match what `readItems` resolves to.
		const pageContent = process.env.USE_FIXTURES
			? ((await import('../../../fixtures/about')).default.data as unknown as AboutPage)
			: await fetchAboutPage();

		if (pageContent?.length === 1) {
			return {
				about: pageContent[0].content
			};
		}
	} catch (apiError) {
		error(500, `Could not load impressum: ${apiError}`);
	}
};
