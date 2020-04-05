<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/projects/${params.slug}.json`);
    const data = await res.json();

   	if (res.status === 200) {
			return { project: data[0] };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>


<script>
  export let project;
</script>


<style>
img {
  width: 100%;
  height: auto;
}
</style>

<h1>{project.name}</h1>
<img src="{project.imageUrl}" alt="">