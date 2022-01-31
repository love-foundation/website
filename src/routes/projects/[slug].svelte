<script context="module" lang="ts">
	export const load = async ({ fetch, params }) => {
		const url = `/projects/${params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			const project = await res.json();
			return {
				props: { project }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import HeroModule from '$lib/components/UI/ContentModules/HeroModule.svelte';
	import Content from '$lib/components/UI/Content.svelte';
	import type { ConvertedSingleProject } from './_types';
	export let project: ConvertedSingleProject[];

	const { name, imageUrl, content, heroColor } = project[0];

	let heroContent = {
		image: imageUrl,
		heading: name,
		bgColor: heroColor
	};
</script>

<svelte:head>
	<title>Projects &mdash; {name}</title>
</svelte:head>

<HeroModule heroModuleProps={heroContent} />

<Content queriedContent={content} />
