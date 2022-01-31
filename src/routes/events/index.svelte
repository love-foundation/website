<script context="module" lang="ts">
	export const load: Load = async ({ fetch, url }) => {
		const fetchUrl = '/events.json';
		const res = await fetch(fetchUrl);
		if (res.ok) {
			const events = await res.json();
			return {
				props: {
					events,
					pageFilters: {
						hub: url.searchParams.get('hub'),
						category: url.searchParams.get('category')
					}
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${fetchUrl}`)
		};
	};
</script>

<script lang="ts">
	import GridGroup from '$lib/components/UI/Grid/GridGroup.svelte';
	import FilterBar from '$lib/components/UI/FilterBar.svelte';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import lozad from 'lozad';
	import type { Load } from '@sveltejs/kit';
	export let events;
	export let pageFilters;

	let eventsArray = events;
	let eventGroups = [];
	let len;
	let categories = [];
	let hubs = [];
	let filteredEvents;
	let currentFilters = { ...pageFilters };

	eventsArray.map((event) => {
		hubs = [...hubs, event.hub];
		if (event.category) {
			categories = [...categories, event.category];
		}
	});

	hubs = [...new Set(hubs)];
	categories = [...new Set(categories)];

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});

	beforeUpdate(() => {
		let params = { ...currentFilters };
		let url = new URL(window.location.href);

		if (params.hub) {
			url.searchParams.set('hub', params.hub);
		} else if (url.searchParams.has('hub')) {
			url.searchParams.delete('hub');
		}

		if (params.category) {
			url.searchParams.set('category', params.category);
		} else if (url.searchParams.has('category')) {
			url.searchParams.delete('category');
		}
		window.history.pushState({}, null, url);
	});

	afterUpdate(() => {
		const observer = lozad();
		observer.observe();
	});

	$: filteredEvents = eventsArray.filter((e) => {
		return Object.entries(currentFilters).every(
			([filterName, value]) => e[filterName] == value || value == undefined
		);
	});

	$: {
		eventGroups = [];
		for (let i = 0, len = filteredEvents.length; i < len; i += 5) {
			eventGroups = [...eventGroups, filteredEvents.slice(i, i + 5)];
		}
	}

	function filterEvents(filter) {
		if (filter.hub) {
			currentFilters.hub = filter.hub;
		} else {
			currentFilters.category = filter.category;
		}
	}

	function reset(filter) {
		delete currentFilters[filter];

		// force an update
		currentFilters = { ...currentFilters };
	}

	let filters = {};
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
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in;
		&:first-of-type {
			padding-top: 50px;
		}
		&.loaded {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>
