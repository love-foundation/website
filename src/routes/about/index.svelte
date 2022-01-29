<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const url = '/about.json';
		const res = await fetch(url);

		if (res.ok) {
			const aboutPageContent = await res.json();
			return {
				props: { queriedContent: aboutPageContent }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import Content from '$lib/components/UI/Content.svelte';
	import type { ContentCollection } from '$lib/types';
	export let queriedContent: ContentCollection[];
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<Content {queriedContent} />
