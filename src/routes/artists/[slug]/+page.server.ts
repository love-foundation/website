export const load = async function ({ params, parent }) {
	const parentData = await parent();
	const singleArtist = parentData.artists?.find((artist) => artist.slug === params.slug);
	return {
		singleArtist: singleArtist
	};
};
