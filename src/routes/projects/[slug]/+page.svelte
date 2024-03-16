<script lang="ts">
	import HeroModule from '$lib/components/UI/ContentModules/HeroModule.svelte';
	import Content from '$lib/components/UI/Content.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
  $: project = data.singleProject

	let heroContent = {
		image: project?.imageUrl,
		heading: project?.name,
		bgColor: project?.heroColor
	};
</script>

<svelte:head>
	<title>Projects &mdash; {project?.name}</title>
</svelte:head>

<HeroModule heroModuleProps={heroContent} />

<Content queriedContent={project?.content} />
