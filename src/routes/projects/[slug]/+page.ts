export async function load({ params, parent }) {
  const parentData = await parent();
  const singleProject = parentData.projects?.find((project) => project.slug === params.slug);
	return {
		singleProject: singleProject
	};
}
