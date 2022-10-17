<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const url = '/vereniging.json';
		const res = await fetch(url);

		if (res.ok) {
			const vereniging = await res.json();
			return {
				props: { queriedContent: vereniging }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import type { Content as ContentCollection } from '$lib/types';
	import Content from '$lib/components/UI/Content.svelte';
	export let queriedContent: ContentCollection[];
</script>

<svelte:head>
	<title>Vereniging Love Foundation</title>
</svelte:head>
<section id="vereniging" class="pad--bottom--small">
	<Content {queriedContent} />
</section>
