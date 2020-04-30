import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
	const lovecasts = await fetchItems("lovecast", "id, name_of_the_set, design.data.*, soundcloud_link", {
		status: "published"
	});

	if (lovecasts !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify(
				lovecasts.map(lovecast => ({
					id: lovecast.id,
					title: lovecast.name_of_the_set,
					imageUrl: lovecast.design ? lovecast.design.data.thumbnails[8].url : "placeholder_lovecasts.jpeg",
					soundcloud: lovecast.soundcloud_link
				}))
			)
		);
	} else {
		next();
	}
}

