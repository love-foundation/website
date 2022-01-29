<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const url = '/lovecasts.json';
		const res = await fetch(url);

		if (res.ok) {
			const lovecasts = await res.json();
			return {
				props: { lovecasts }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import GridGroup from '$lib/components/UI/Grid/GridGroup.svelte';
	import lozad from 'lozad';
	import { onMount } from 'svelte';
	import type { ConvertedLovecast } from './types';

	export let lovecasts: ConvertedLovecast[];

	let lovecastsArray = lovecasts;
	let lovecastGroups = [];
	let len;

	for (let i = 0, len = lovecasts.length; i < len; i += 5) {
		lovecastGroups.push(lovecasts.slice(i, i + 5));
	}

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

<svelte:head>
	<title>Lovecasts</title>
</svelte:head>

{#each lovecastGroups as lovecastGroup, i (Math.random())}
	<section data-toggle-class="loaded" class:loaded={i < 1} class:lozad={i >= 1}>
		<GridGroup itemGroup={lovecastGroup} groupIndex={i} lazy={i >= 1} />
	</section>
{/each}

<style lang="scss">
	section {
		opacity: 0;
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in;
		&.loaded {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>
