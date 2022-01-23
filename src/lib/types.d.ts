export interface Hubs {
	active: boolean;
	status: string;
	city: string;
	facebook: string;
	instagram: string;
}

export interface Content {
	id: string;
	type: string;
	details: {
		text: string;
		textLayout: string;
		imageOne: string;
		imageTwo: string;
		padding: string;
		captions: string;
		heroColor: string | undefined;
	};
}

type MyCollections = {
	hubs: Hubs;
	content: Content;
};
