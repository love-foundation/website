import type { Events } from '$lib/types';

export type convertedIndexArtist = {
	id: string;
	slug: string;
	name: string;
	imageUrl: string;
	location: string;
	category: string;
};

export type convertedSingleArtist = {
	name: string;
	slug: string;
	image: string;
	status: string;
	location: string;
	category: string;
	facebook: string;
	soundcloud: string;
	heroColor: string | null;
	events: PartialItem<Events>[];
};
