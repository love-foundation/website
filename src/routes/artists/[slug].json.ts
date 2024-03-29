import type { Events, EventsArtists } from '$lib/types';
import { directus, status } from '$lib/_directus';
import type { RequestHandler } from '@sveltejs/kit';
import type { convertedSingleArtist } from './_types';

export const get: RequestHandler = async ({ params }) => {
	const artist = await directus()
		.items('artists')
		.readByQuery({
			fields:
				'id, slug, artist_name, image, current_location, type_of_art, events.*.*.*, soundcloud_url, facebook_url, level_of_involvement, hero_background_color',
			filter: {
				slug: params.slug,
				status: {
					_in: status
				}
			}
		});

	const artistData: convertedSingleArtist[] = artist.data.flatMap((artist) => {
		const {
			artist_name,
			slug,
			image,
			level_of_involvement,
			current_location,
			type_of_art,
			facebook_url,
			soundcloud_url,
			hero_background_color,
			events
		} = artist;
		return {
			name: artist_name,
			slug: slug,
			image: image
				? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + image + '?key=artist-square'
				: '/placeholder_artists.png',
			status: level_of_involvement,
			location: current_location,
			category: type_of_art,
			facebook: facebook_url,
			soundcloud: soundcloud_url,
			heroColor: hero_background_color || null,
			events:
				Array.isArray(events) &&
				events
					.filter((event) => event.events_id && event.events_id.status === 'published')
					.map((event: EventsArtists) => {
						if (event.events_id && typeof event.events_id != 'number') {
							const { id, slug, name, poster, hubs, status }: Partial<Events> = event.events_id;
							if (status === 'published')
								return {
									id: id,
									slug: slug,
									title: name,
									imageUrl: poster
										? import.meta.env.VITE_DIRECTUS_URL +
										  'assets/' +
										  poster.id +
										  '?key=event-poster'
										: '/placeholder_events.png',
									hub: hubs ? hubs[0].hubs_id.city : null
								};
						}
					})
		};
	});

	if (artistData) {
		return {
			body: JSON.stringify(artistData[0])
		};
	}

	return {
		status: 404
	};
};
