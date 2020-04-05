import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
  const projectContent = await fetchItems("projects", "slug, content.*.*.*, name, main_image.*.*, pillar", {
    slug: req.params.slug
  });

  if (projectContent !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify(
        projectContent.map(project => ({
          id: project.id,
          slug: project.slug,
          name: project.name,
          imageUrl: project.main_image.data.full_url,
          pillar: project.pillar,
          content: project.content.map(content => ({
            id: content.id,
            type: content.type,
            details: {
              text: content.text,
              textLayout: content.text_layout,
              imageOne: content.image,
              imageTwo: content.image_two,
              padding: content.distance_to_next,
              captions: content.captions
            }
          }))
        }))
      )
    );
  } else {
    next();
  }

}

