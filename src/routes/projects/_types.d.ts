import type { ContentCollection } from '$lib/types';

export type ConvertedProjectForIndex = {
	id: number;
	name: string;
	imageUrl: string;
	pillar: string;
	country: string;
	slug: string;
};

export type ConvertedSingleProject = {
	name: string;
	imageUrl: string;
	heroColor: string;
	content: PartialItem<ContentCollection[]>;
};
