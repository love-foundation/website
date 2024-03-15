import type { ConvertedIndexEvents } from '../events/_types';

export type ConvertedArtist = {
	id: string;
	slug: string;
	name: string;
	imageUrl: string;
	location: string;
	category: string;
	status: string;
	location: string;
	category: string;
	facebook?: string | null;
	soundcloud?: string | null;
	heroColor?: string | null;
	events: ConvertedIndexEvents[];
};
