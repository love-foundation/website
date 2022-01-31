import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};

export const getSession: GetSession = async (request) => {
	return {
		events: [],
		cookieConsent: {
			necessary: false
		}
	};
};
