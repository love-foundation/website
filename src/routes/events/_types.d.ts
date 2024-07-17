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
	artists: {
		id: string;
		slug: string;
		name: string;
		imageUrl: string;
	}[];
};
