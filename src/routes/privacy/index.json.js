import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
  const pageContent = await fetchItems("pages", "slug, content.*.*.*", {
    slug: "privacy-policy"
  });

  const queriedContent = pageContent[0].content;

  if (queriedContent !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify(
        queriedContent.map(content => ({
          id: content.id,
          type: content.type,
          details: {
            text: content.text,
            textLayout: content.text_layout,
            imageOne: content.image,
            imageTwo: content.image_two,
            padding: content.distance_to_next,
            captions: content.captions,
            heroColor: content.hero_background_color  || null
          }

        }))
      )
    );
  } else {
    next();
  }

}

