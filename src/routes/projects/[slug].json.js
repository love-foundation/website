import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
  const projectContent = await fetchItems("projects", "slug, content.*.*.*, name, main_image.*.*, pillar, hero_background_color", {
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
          imageUrl: project.main_image ? process.env.DIRECTUS_URL + "assets/" + project.main_image.id : "placeholder_projects.jpeg",
          pillar: project.pillar,
          heroColor: project.hero_background_color || null,
          content: project.content.map(content => ({
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
        }))
      )
    );
  } else {
    next();
  }

}

