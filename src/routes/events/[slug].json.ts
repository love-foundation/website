import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';
import type { ConvertedSingleEvent } from './types';

export const get: RequestHandler = async ({ params }) => {
	const event = await directus()
		.items('events')
		.readMany({
			fields:
				'id, name, slug, poster, hubs.*.*, location, startdatetime, enddatetime, event_type, artists.*.*, hero_background_color',
			filter: {
				slug: params.slug,
				status: {
					_in: status
				}
			}
		});

	const eventData: ConvertedSingleEvent[] = event.data.flatMap((event) => {
		const {
			name,
			slug,
			hubs,
			hero_background_color,
			artists,
			startdatetime,
			enddatetime,
			event_type,
			location,
			poster
		} = event;
		console.log(poster);
		return {
			name: name,
			slug: slug,
			hub: hubs[0] ? hubs[0].hubs_id.city : null,
			starttime: startdatetime,
			endtime: enddatetime,
			category: event_type,
			location: location,
			imageUrl: poster
				? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + poster + '?key=event-poster'
				: 'placeholder_events.png',
			heroColor: hero_background_color || null,
			artists: artists.map((artist) => {
				const { id, slug, artist_name, image } = artist.artists_id;
				return {
					id: id,
					slug: slug,
					name: artist_name,
					imageUrl: image
						? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + image + '?key=artist-square'
						: 'placeholder_artists.png'
				};
			})
		};
	});

	if (eventData) {
		return {
			body: JSON.stringify(eventData)
		};
	}

	return {
		status: 404
	};
};
