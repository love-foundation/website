import { directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';
import type { ConvertedIndexEvents } from './events/_types';

export const prerender = true;

export const load = async () => {
	const events = await directus()
		.items('events')
		.readByQuery({
			fields: [
				'id',
				'name',
				'poster',
				'event_type',
				'hubs',
				'startdatetime',
				'enddatetime',
				'location',
				'slug',
				'artists.artists_id.id',
				'artists.artists_id.artist_name',
				'artists.artists_id.image',
				'artists.artists_id.slug',
				'hero_background_color'
			],
			filter: {
				status: {
					_in: status
				}
			},
			sort: ['sort', '-startdatetime'],
			limit: -1
		});

	const eventsData: ConvertedIndexEvents[] =
		events.data
			?.filter((event) => event.slug)
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
						: 'placeholder_events.png',
					hub:
						hubs[0] && typeof hubs[0] !== 'string' && typeof hubs[0].hubs_id !== 'number'
							? hubs[0].hubs_id?.city || ''
							: '',
					category: event_type || '',
					starttime: startdatetime,
					endtime: enddatetime,
					artists: artists
						.map((artist) => {
							if (typeof artist !== 'object') {
								return;
							}
							return {
								id: artist.artists_id.id,
								slug: artist.artists_id.slug,
								name: artist.artists_id.artist_name,
								imageUrl: artist.artists_id.image
									? import.meta.env.VITE_DIRECTUS_URL +
										'assets/' +
										artist.artists_id.image +
										'?key=artist-square'
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
