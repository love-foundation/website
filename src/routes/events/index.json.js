import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
	const events = await fetchItems("events", "id, name, poster.data.*, event_type, hubs.*.*", {
		on_website: 1
	});

	if (events !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify(
				events.map(event => ({
					id: event.id,
					title: event.name,
					imageUrls: event.poster.data,
					hub: event.hubs[0] ? event.hubs[0].hubs_id.city : null,
					category: event.event_type
				}))
			)
		);
	} else {
		next();
	}
}

