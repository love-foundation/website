import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';

const BASE_URL =
	import.meta.env.MODE === 'production'
		? 'https://www.love-foundation.org'
		: import.meta.env.MODE === 'staging'
		? 'https://staging.love-foundation.org'
		: 'http://localhost:3000';
const pages = [];

fs.readdirSync('./src/routes').forEach((file) => {
	file = file.split('.')[0];
	if (file.charAt(0) !== '_' && file !== 'sitemap' && file !== 'hubs' && file !== 'index') {
		pages.push(file);
	}
});

const render = (
	pages,
	events,
	artists,
	lovecasts,
	projects
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
		.map(
			(page) => `
    <url><loc>${BASE_URL}/${page}</loc><priority>0.85</priority></url>
  `
		)
		.join('\n')}
  ${events
		.map(
			(event) => `
      <url>
        <loc>${BASE_URL}/events/${event.slug}</loc>
        <priority>0.69</priority>
      </url>
    `
		)
		.join('\n')}
    ${artists
			.map(
				(artist) => `
        <url>
          <loc>${BASE_URL}/artists/${artist.slug}</loc>
          <priority>0.69</priority>
        </url>
      `
			)
			.join('\n')}
      ${lovecasts
				.map(
					(lovecast) => `
          <url>
            <loc>${BASE_URL}/lovecasts/${lovecast.id}</loc>
            <priority>0.69</priority>
          </url>
        `
				)
				.join('\n')}
      ${projects
				.map(
					(project) => `
            <url>
              <loc>${BASE_URL}/projects/${project.slug}</loc>
              <priority>0.69</priority>
            </url>
          `
				)
				.join('\n')}

</urlset>
`;

export const get: RequestHandler = async () => {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};

	let fetchedEvents = await fetch(
		import.meta.env.MODE === 'development'
			? `http://localhost:3000/events.json`
			: `${BASE_URL}/events.json`,
		{
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	let fetchedArtists = await fetch(
		import.meta.env.MODE === 'development'
			? `http://localhost:3000/artists.json`
			: `${BASE_URL}/artists.json`,
		{
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	let fetchedLovecasts = await fetch(
		import.meta.env.MODE === 'development'
			? `http://localhost:3000/lovecasts.json`
			: `${BASE_URL}/lovecasts.json`,
		{
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	let fetchedProjects = await fetch(
		import.meta.env.MODE === 'development'
			? `http://localhost:3000/projects.json`
			: `${BASE_URL}/projects.json`,
		{
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const events = await fetchedEvents.json();
	const artists = await fetchedArtists.json();
	const lovecasts = await fetchedLovecasts.json();
	const projects = await fetchedProjects.json();

	const sitemap = render(pages, events, artists, lovecasts, projects);
	return {
		headers,
		body: sitemap
	};
};
