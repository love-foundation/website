import type { Artists } from '$lib/types';

export type ConvertedIndexEvents = {
	id: number;
	slug: string;
	title: string;
	imageUrl: string;
	hub: string;
	category: string;
	starttime: DateTime;
	endtime: DateTime;
	location?: string;
	heroColor?: string | null;
	artists: PartialItem<Artists>[];
};

export type ConvertedSingleEvent = {
	name: string;
	slug: string;
	hub: string | null;
	starttime: DateTime;
	endtime: DateTime;
	category: string;
	location: string;
	imageUrl: string;
	heroColor: string | null;
	artists: PartialItem<Artists>[];
};
