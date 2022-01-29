import { fetchItems } from '$lib/_directus';
import { dynamicSort } from '$lib/helpers/sharedFunctions.js';

import fakeResponse from '../../../cypress/fixtures/events.js';
fs.writeFileSync('./lovecasts.json', JSON.stringify(lovecasts));

import fs from 'fs';
export async function get(req, res, next) {
	let events;

	const callApi =
		import.meta.env.NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'staging';

	if (callApi) {
		const events = await fetchItems(
			'events',
			'id, name, poster, event_type, hubs.*.*, startdatetime, slug'
		);
		events.sort(dynamicSort('startdatetime')).reverse();
		if (events !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					events.map((event) => ({
						id: event.id,
						slug: event.slug,
						title: event.name,
						imageUrl: event.poster
							? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + event.poster + '?key=event-poster'
							: 'placeholder_events.png',
						hub: event.hubs[0] && event.hubs[0].hubs_id ? event.hubs[0].hubs_id.city : null,
						category: event.event_type,
						starttime: event.startdatetime
					}))
				)
			);
		} else {
			next();
		}
	} else {
		events = fakeResponse;
		if (events !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify(
					events.map((event) => ({
						...event
					}))
				)
			);
		}
	}
}
