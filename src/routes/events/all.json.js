import { fetchEvents } from '../../directus';


export async function get(req, res, next) {
  const events = await fetchEvents();

  if (events !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
			JSON.stringify(
				events.map(event => ({
					title: event.name,
					imageUrls: event.poster.data
				}))
			)
		);
  } else {
		next();
  }
}

