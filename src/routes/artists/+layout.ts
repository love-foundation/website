import { callApi, directus, status } from '$lib/_directus';
import { error } from '@sveltejs/kit';
import artistFixture from '../../fixtures/artists';
import type { LayoutLoad } from './$types';
import type { ConvertedArtist } from './_types';

export const prerender = true;

export const load: LayoutLoad = async ({ parent }) => {
	try {
		const artists = callApi
			? await directus()
					.items('artists')
					.readByQuery({
						fields: [
							'id',
							'artist_name',
							'image',
							'current_location',
							'type_of_art',
							'slug',
							'events.events_id.id',
							'soundcloud_url',
							'facebook_url',
							'level_of_involvement',
							'hero_background_color'
						],
						filter: {
							status: {
								_in: status
							}
						}
					})
			: artistFixture;

		if (!artists.data) {
			throw new Error('No data returned from Directus');
		}

		const storedEvents = (await parent()).events;
		const artistsData: ConvertedArtist[] = artists.data.map((artist) => {
			const {
				id,
				slug,
				artist_name,
				image,
				current_location,
				type_of_art,
				events,
				soundcloud_url,
				facebook_url,
				level_of_involvement,
				hero_background_color
			} = artist;
			const flattenedArtistEvents = events
				.map((event) => {
					if (!event.events_id || typeof event !== 'object' || event.events_id === undefined) {
					} else {
						return event.events_id.id;
					}
				})
				.filter((event) => event !== undefined) as number[];
			const artistEvents = storedEvents.filter((event) => flattenedArtistEvents.includes(event.id));
			return {
				id: id.toString(),
				slug: slug ?? '/404',
				name: artist_name ?? 'No artist name defined',
				imageUrl: image
					? import.meta.env.VITE_DIRECTUS_URL + 'assets/' + image + '?key=artist-square'
					: 'placeholder_artists.png',
				location: current_location ?? 'No location defined',
				category: type_of_art ?? 'No category defined',
				status: '',
				facebook: facebook_url,
				soundcloud: soundcloud_url,
				level_of_involvement: level_of_involvement,
				heroColor: hero_background_color,
				events: artistEvents
			};
		});

		if (artistsData) {
			return {
				artists: artistsData
			};
		}
	} catch (apiError) {
		error(500, `Could not load impressum: ${apiError}`);
	}
};
