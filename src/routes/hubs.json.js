import { fetchItems } from '../_directus';


export async function get(req, res, next) {
	const hubs = await fetchItems("hubs", "id, city, instagram, facebook", {
		active: 1
	});

	if (hubs !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify(
				hubs.map(hub => ({
					...hub
				}))
			)
		);
	} else {
		next();
	}
}

