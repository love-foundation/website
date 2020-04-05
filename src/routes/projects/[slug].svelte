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
  import Content from "../../components/UI/Content.svelte";
  export let project;

  let { name, imageUrl, content, pillar } = project;
  console.log(project);
</script>

<style>
  img {
    width: 100%;
    height: auto;
  }
</style>

<svelte:head>
  <title>Projects &mdash; {name}</title>
</svelte:head>

<h1>{name}</h1>
<img src={imageUrl} alt="{name} image" />

<Content queriedContent={content} />