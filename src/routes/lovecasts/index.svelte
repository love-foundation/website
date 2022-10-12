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
	import { setTransitionDuration, updateClass } from '$lib/helpers/sharedFunctions';
	import lozad from 'lozad';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { ConvertedLovecast } from './_types';
	import { browser } from '$app/env';

	export let lovecasts: ConvertedLovecast[];

	let lovecastGroups = [];
	let headerClass = 'show';
	let y = 0;
	let lastY = 0;
	let helper;

	let lovecastFilters: {
		type?: string;
	} = { type: browser && $page.url.searchParams.get('type') };

	onMount(() => {
		lovecastFilters.type = $page.url.searchParams.get('type');
		const observer = lozad();
		observer.observe();
	});

	beforeUpdate(() => {
		let url = new URL(window.location.href);
		if (lovecastFilters.type) {
			url.searchParams.set('type', lovecastFilters.type);
		} else {
			url.searchParams.delete('type');
		}
		window.history.pushState({}, null, url);
	});

	function filterLovecasts(type) {
		if (lovecastFilters.type === type) {
			delete lovecastFilters.type;
			// force update
			lovecastFilters = lovecastFilters;
		} else {
			lovecastFilters.type = type;
		}
	}
	$: filteredLovecasts = lovecasts.filter((lovecast) =>
		lovecastFilters.type ? lovecast.type === lovecastFilters.type : true
	);

	$: {
		helper = updateClass(y, lastY);
		headerClass = helper.class;
		lastY = helper.lastY;
	}

	$: {
		lovecastGroups = [];
		for (let i = 0, len = filteredLovecasts.length; i < len; i += 5) {
			lovecastGroups.push(filteredLovecasts.slice(i, i + 5));
		}
	}

	afterUpdate(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

<svelte:head>
	<title>Lovecasts</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<div use:setTransitionDuration class={`topbar columns centered is-mobile ${headerClass}`}>
	<div class="column is-hidden-mobile" />
	<div class="column is-6-mobile is-2-desktop shuffle">
		<h2
			class="vcentered pointer centered"
			on:click={() => filterLovecasts('lovecast')}
			class:active={lovecastFilters.type === 'lovecast'}
		>
			Lovecasts
		</h2>
	</div>
	<div class="column is-6-mobile is-2-desktop shuffle">
		<h2
			class="vcentered pointer centered"
			on:click={() => filterLovecasts('radiocast')}
			class:active={lovecastFilters.type === 'radiocast'}
		>
			Radiocasts
		</h2>
	</div>
	<div class="column is-hidden-mobile" />
</div>
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
	.topbar {
		position: fixed;
		width: 100%;
		border-bottom: 1px solid $medium-grey;
		background: $white;
		z-index: 10;
		top: $mobile-header-height;
		left: 0;
		right: 0;
		margin-top: -57px;
		height: $mobile-header-height;
		transition: transform 300ms ease-in-out;

		@include desktop {
			height: $desktop-header-height;
			top: $desktop-header-height;
			margin: 0;
			margin-top: -50px;
		}
		&.show {
			transform: translateY(100%);
		}
		&.hide {
			transform: translateY(0%);
		}
		.shuffle {
			margin-top: -1px;
		}

		h2.active {
			text-decoration: underline;
		}
	}
</style>
