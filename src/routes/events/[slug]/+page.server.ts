import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ params, parent }) {
	const parentData = await parent();
	const singleEvent = parentData.events?.find((event) => event.slug === params.slug);
	return {
		singleEvent: singleEvent
	};
};
