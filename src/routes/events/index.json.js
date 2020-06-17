import { fetchItems } from '../../_directus';
import { dynamicSort } from "../../lib/helpers/sharedFunctions.js";


export async function get(req, res, next) {
	const events = await fetchItems("events", "id, name, poster.data.*, event_type, hubs.*.*, startdatetime, slug", {});
	events.sort(dynamicSort("startdatetime")).reverse();
	if (events !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify(
				events.map(event => ({
					id: event.id,
					slug: event.slug,
					title: event.name,
					imageUrl: event.poster ? event.poster.data.thumbnails[7].url : "placeholder_events.png",
					hub: event.hubs[0] ? event.hubs[0].hubs_id.city : null,
					category: event.event_type,
					starttime: event.startdatetime
				}))
			)
		);
	} else {
		next();
	}
}

