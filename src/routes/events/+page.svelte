<script lang="ts">
	import GridGroup from '$lib/components/UI/Grid/GridGroup.svelte';
	import FilterBar from '$lib/components/UI/FilterBar.svelte';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import lozad from 'lozad';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { ConvertedIndexEvents } from './_types';
	import { goto, pushState } from '$app/navigation';

	export let data: PageData;

	const pageFilters: {
		hub?: string | null | boolean;
		category?: string | null | boolean;
	} = {};

	$: eventsArray = data.events;
	let eventGroups: ConvertedIndexEvents[][] = [];

	let filteredEvents: ConvertedIndexEvents[];
	let currentFilters = { ...pageFilters };

	$: hubs = [...new Set(eventsArray.map((event) => event.hub))];
	$: categories = [...new Set(eventsArray.map((event) => event.category))];

	onMount(() => {
		const observer = lozad();
		observer.observe();
		pageFilters.category = $page.url.searchParams.get('category');
		pageFilters.hub = $page.url.searchParams.get('hub');
	});

	beforeUpdate(() => {
		let params = { ...currentFilters };
		let url = new URL(window.location.href);

		if (params.hub) {
			url.searchParams.set('hub', params.hub.toString());
		} else if (url.searchParams.has('hub')) {
			url.searchParams.delete('hub');
		}

		if (params.category) {
			url.searchParams.set('category', params.category.toString());
		} else if (url.searchParams.has('category')) {
			url.searchParams.delete('category');
		}
		goto(`?${url.searchParams.toString()}`, {});
	});

	afterUpdate(() => {
		const observer = lozad();
		observer.observe();
	});

	$: filteredEvents = eventsArray.filter((e) => {
		return Object.entries(currentFilters).every(
			([filterName, value]) => e[filterName as keyof typeof e] == value || value == undefined
		);
	});

	$: {
		eventGroups = [];
		for (let i = 0, len = filteredEvents.length; i < len; i += 5) {
			eventGroups = [...eventGroups, filteredEvents.slice(i, i + 5)];
		}
	}

	function filterEvents(filter: typeof currentFilters) {
		if (filter.hub) {
			currentFilters.hub = filter.hub;
		} else {
			currentFilters.category = filter.category;
		}
	}

	function reset(filter: 'hub' | 'category') {
		delete currentFilters[filter];

		// force an update
		currentFilters = { ...currentFilters };
	}

	$: filters = {
		hub: {
			placeholder: 'Location',
			options: hubs,
			value: pageFilters.hub
		},
		category: {
			placeholder: 'Genre',
			options: categories,
			value: pageFilters.category
		}
	};
</script>

<svelte:head>
	<title>Events</title>
</svelte:head>

<FilterBar
	{filters}
	on:selected={(data) => {
		filterEvents(data.detail);
	}}
	on:clear={(data) => {
		reset(data.detail);
	}}
/>

{#each eventGroups as eventGroup, i (Math.random())}
	<section data-toggle-class="loaded" class:loaded={i < 1} class:lozad={i >= 1}>
		<GridGroup itemGroup={eventGroup} groupIndex={i} lazy={i >= 1} />
	</section>
{/each}

<style lang="scss">
	section {
		opacity: 0;
		transition:
			margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
			opacity 1s ease-in;
		&:first-of-type {
			padding-top: 50px;
		}
		&.loaded {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>
