import { directus, status } from '$lib/_directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type { ConvertedIndexEvents } from './events/_types';

export const prerender = process.env.ADAPTER === 'node' ? false : true;

export const load = async () => {
	const events = process.env.USE_FIXTURES
		? (await import('../../fixtures/events')).default
		: await directus.request(
				readItems('events', {
					fields: [
						'id',
						'name',
						'poster',
						'event_type',
						{ hubs: [{ hubs_id: ['city'] }] },
						'startdatetime',
						'enddatetime',
						'location',
						'slug',
						{ artists: [{ artists_id: ['id', 'artist_name', 'image', 'slug'] }] },
						'hero_background_color'
					],
					filter: {
						status: {
							_in: status
						}
					},
					sort: ['sort', '-startdatetime'],
					limit: -1
				})
			);

	const eventsData: ConvertedIndexEvents[] =
		events
			?.filter((event) => !!event.slug)
			.map((event) => {
				const {
					id,
					name,
					poster,
					event_type,
					hubs,
					startdatetime,
					slug,
					enddatetime,
					artists,
					location,
					hero_background_color
				} = event;
				return {
					id: id,
					slug: slug,
					title: name,
					imageUrl: poster
						? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + poster + '?key=event-poster'
						: '/placeholder_events.png',
					hub:
						hubs?.[0] && typeof hubs[0] !== 'string' && typeof hubs[0].hubs_id !== 'number'
							? hubs[0].hubs_id?.city || ''
							: '',
					category: event_type || '',
					starttime: startdatetime,
					endtime: enddatetime,
					artists: artists
						?.map((artist) => {
							if (!artist.artists_id || typeof artist !== 'object') {
								return;
							}
							const { id, artist_name, image, slug } = artist.artists_id as {
								id: number;
								artist_name: string;
								slug: string;
								image: string | null;
							};

							return {
								id,
								slug,
								name: artist_name,
								imageUrl: image
									? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + image + '?key=artist-square'
									: '/placeholder_artists.png'
							};
						})
						.filter((artist) => artist !== undefined) as ConvertedIndexEvents['artists'],
					heroColor: hero_background_color,
					location: location ?? 'No location defined'
				};
			}) ?? [];

	if (eventsData) {
		return {
			events: eventsData
		};
	}
	error(500, 'Fetching events failed');
};
