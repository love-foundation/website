import { callApi, directus, status } from '$lib/_directus';
import type { LayoutLoad } from './$types';
import type { ConvertedIndexEvents } from './events/_types';
import eventFixture from '../fixtures/events';
import type { ManyItems } from '@directus/sdk';
import type { Events } from '$lib/types';
import blindCast from '$lib/helpers/blindCast';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: LayoutLoad = async () => {
	const events: ManyItems<Events> = callApi
		? await directus()
				.items('events')
				.readByQuery({
					fields: ['id', 'name', 'poster', 'event_type', 'hubs', 'startdatetime', 'slug'],
					filter: {
						status: {
							_in: status
						}
					},
					sort: ['sort', '-startdatetime'],
					limit: -1
				})
		: blindCast(eventFixture);
	const eventsData: ConvertedIndexEvents[] =
		events.data
			?.filter((event) => event.slug)
			.map((event) => {
				const { id, name, poster, event_type, hubs, startdatetime, slug } = event;
				return {
					id: id,
					slug: slug,
					title: name,
					imageUrl: poster
						? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + poster + '?key=event-poster'
						: 'placeholder_events.png',
					hub:
						hubs[0] && typeof hubs[0] !== 'string' && typeof hubs[0].hubs_id !== 'number'
							? hubs[0].hubs_id?.city || ''
							: '',
					category: event_type || '',
					starttime: startdatetime
				};
			}) ?? [];

	if (eventsData) {
		return {
			events: eventsData
		};
	}
	throw error(500, 'Fetching events failed');
};
