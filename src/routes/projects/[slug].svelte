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
  import HeroModule from "../../components/UI/ContentModules/HeroModule.svelte";
  import Content from "../../components/UI/Content.svelte";
  export let project;

  let { name, imageUrl, content, pillar } = project;

  let heroContent = {};

  heroContent.image = imageUrl;
  heroContent.heading = name;
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

<HeroModule content={heroContent} />

<Content queriedContent={content} />
