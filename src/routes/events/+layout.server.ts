export const load = async function ({ params, parent }) {
	const parentData = await parent();
	const singleEvent = parentData.events?.find((event) => event.slug === params.slug);
	return {
		singleEvent: singleEvent
	};
};
