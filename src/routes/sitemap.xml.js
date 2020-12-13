import fs from 'fs';
import fetch from 'node-fetch';



const BASE_URL = process.env.NODE_ENV === 'production' ? "https://www.love-foundation.org" : process.env.NODE_ENV === 'staging'? "https://staging.love-foundation.org" : "http://localhost:3000";
const pages = [];

fs.readdirSync("./src/routes").forEach(file => {
  file = file.split('.')[0];
  if (file.charAt(0) !== '_' && file !== "sitemap" && file !== "hubs" && file !== "index") {
    pages.push(file);
  }
});

const render = (pages, events, artists, lovecasts, projects) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
    .map(
      page => `
    <url><loc>${BASE_URL}/${page}</loc><priority>0.85</priority></url>
  `
    )
    .join("\n")}
  ${events
    .map(
      event => `
      <url>
        <loc>${BASE_URL}/events/${event.slug}</loc>
        <priority>0.69</priority>
      </url>
    `
    )
    .join("\n")}
    ${artists
    .map(
      artist => `
        <url>
          <loc>${BASE_URL}/artists/${artist.slug}</loc>
          <priority>0.69</priority>
        </url>
      `
    )
    .join("\n")}
      ${lovecasts
    .map(
      lovecast => `
          <url>
            <loc>${BASE_URL}/lovecasts/${lovecast.id}</loc>
            <priority>0.69</priority>
          </url>
        `
    )
    .join("\n")}
      ${projects
    .map(
      project => `
            <url>
              <loc>${BASE_URL}/projects/${project.slug}</loc>
              <priority>0.69</priority>
            </url>
          `
    )
    .join("\n")}

</urlset>
`;

export async function get(req, res, next) {
  let fetchedEvents = await fetch(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/events.json`
      : `${BASE_URL}/events.json`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  let fetchedArtists = await fetch(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/artists.json`
      : `${BASE_URL}/artists.json`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  let fetchedLovecasts = await fetch(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/lovecasts.json`
      : `${BASE_URL}/lovecasts.json`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  let fetchedProjects = await fetch(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/projects.json`
      : `${BASE_URL}/projects.json`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const events = await fetchedEvents.json();
  const artists = await fetchedArtists.json();
  const lovecasts = await fetchedLovecasts.json();
  const projects = await fetchedProjects.json();

  res.setHeader("Cache-Control", `max-age=0, s-max-age=${600}`); // 10 minutes
  res.setHeader("Content-Type", "application/rss+xml");
  const sitemap = render(pages, events, artists, lovecasts, projects);
  res.end(sitemap);
}
