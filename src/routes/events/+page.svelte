<script lang="ts">
	import GridGroup from '$lib/components/UI/Grid/GridGroup.svelte';
	import FilterBar from '$lib/components/UI/FilterBar.svelte';
	import { onMount, afterUpdate } from 'svelte';
	import lozad from 'lozad';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { ConvertedIndexEvents } from './_types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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

	// Mirror the active filters into the query string. This must not run from
	// `beforeUpdate`: `goto` schedules another update, which re-runs the hook and
	// navigates again in a loop. Reacting to the filter values and skipping the
	// navigation when the URL already matches keeps it to one `goto` per change.
	$: syncFiltersToUrl(currentFilters.hub, currentFilters.category);

	function syncFiltersToUrl(
		hub: string | null | boolean | undefined,
		category: string | null | boolean | undefined
	) {
		if (!browser) return;

		const url = new URL(window.location.href);

		if (hub) {
			url.searchParams.set('hub', hub.toString());
		} else {
			url.searchParams.delete('hub');
		}

		if (category) {
			url.searchParams.set('category', category.toString());
		} else {
			url.searchParams.delete('category');
		}

		if (url.search === window.location.search) return;

		goto(`${url.pathname}${url.search}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	}

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

{#each eventGroups as eventGroup, i (eventGroup[0].id)}
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
