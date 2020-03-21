import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
  const pageContent = await fetchItems("pages", "slug, content.*.*.*", {
    slug: "test"
  });
  const queriedContent = pageContent[0].content;

  if (queriedContent !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify(
        queriedContent.map(content => ({
          id: content.id,
          text: content.text,
          type: content.type,
          imageOne: content.image,
          imageTwo: content.image_two
        }))
      )
    );
  } else {
    next();
  }

}

