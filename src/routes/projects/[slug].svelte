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
	import HeroModule from '$lib/components/UI/ContentModules/HeroModule.svelte';
	import Content from '$lib/components/UI/Content.svelte';
	export let project;

	let { name, imageUrl, content, pillar, heroColor } = project;

	let heroContent = {};

	heroContent.image = imageUrl;
	heroContent.heading = name;
	heroContent.bgColor = heroColor;
</script>

<svelte:head>
	<title>Projects &mdash; {name}</title>
</svelte:head>

<HeroModule content={heroContent} />

<Content queriedContent={content} />
