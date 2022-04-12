import { directus, status, callApi } from '$lib/_directus';

import fakeResponse from '../../../cypress/fixtures/events';
import type { RequestHandler } from '@sveltejs/kit';
import type { ConvertedIndexEvents } from './_types.js';
export const get: RequestHandler = async () => {
	const events = callApi
		? await directus()
				.items('events')
				.readByQuery({
					fields: 'id, name, poster, event_type, hubs.*.*, startdatetime, slug',
					filter: {
						status: {
							_in: status
						}
					},
					sort: ['sort', '-startdatetime'],
					limit: -1
				})
		: fakeResponse;
	const eventsData: ConvertedIndexEvents[] = events.data.map((event) => {
		const { id, name, poster, event_type, hubs, startdatetime, slug } = event;
		return {
			id: id,
			slug: slug,
			title: name,
			imageUrl: poster
				? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + poster + '?key=event-poster'
				: 'placeholder_events.png',
			hub: hubs[0] && hubs[0].hubs_id ? hubs[0].hubs_id.city : null,
			category: event_type,
			starttime: startdatetime
		};
	});

	if (eventsData) {
		return {
			body: JSON.stringify(eventsData)
		};
	}

	return {
		status: 404
	};
};
