import { fetchItems } from '../../_directus';


export async function get(req, res, next) {
  const projects = await fetchItems("projects", "id, name, main_image.*.*, pillar, slug", {});

  if (projects !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify(
        projects.map(project => ({
          id: project.id,
          name: project.name,
          imageUrl: project.main_image ? project.main_image.data.full_url : "placeholder_projects.jpeg",
          pillar: project.pillar,
          slug: project.slug
        }))
      )
    );
  } else {
    next();
  }

}

