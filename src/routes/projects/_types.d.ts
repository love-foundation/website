import type { ContentCollection } from '$lib/types';

export type ConvertedProjects = {
	id: number;
	name: string;
	imageUrl: string;
	pillar: string;
	country: string;
	slug: string;
  heroColor?: string | null;
	content: PartialItem<ContentCollection[]>;
};
