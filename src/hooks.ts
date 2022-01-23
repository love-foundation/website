import cookie from 'cookie';
import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const response = await resolve(event);

	if (!cookies.cookieConsent) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('cookieConsent', '{ necessary: false }', {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

export const getSession: GetSession = async (request) => {
	return {
		events: []
	};
};
