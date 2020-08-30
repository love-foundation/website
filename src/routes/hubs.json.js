import { fetchItems } from '../_directus';

import  fakeResponse  from '../../cypress/fixtures/hubs.js'

export async function get(req, res, next) {

	let hubs;

	const callApi = process.env.NODE_ENV === 'production';

	if (callApi) {
		hubs = await fetchItems("hubs", "id, city, instagram, facebook", {
			active: 1
			});
	} else {
		hubs = fakeResponse;
	}


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

