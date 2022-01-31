<script context="module" lang="ts">
	export const load: Load = async ({ fetch, params }) => {
		const url = `/events/${params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			const event = await res.json();
			return {
				props: { event }
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
	import ArtistItem from '$lib/components/UI/ArtistItem.svelte';
	import { normalizeEventDate, normalizeTime } from '$lib/helpers/sharedFunctions';
	import type { Load } from '@sveltejs/kit';
	import type { ConvertedSingleEvent } from './types';

	export let event: ConvertedSingleEvent;

	let heroContent: {
		image?: string;
		bgColor?: string;
		heading?: string;
	} = {};

	heroContent.image = event[0]?.imageUrl;
	heroContent.bgColor = event[0]?.heroColor;
</script>

<svelte:head>
	<title>{event[0]?.name}</title>
</svelte:head>

<HeroModule heroModuleProps={heroContent} />
<div class="head">
	<h1>{event[0]?.name}</h1>
</div>
<div class="info">
	<div class="columns is-vertical is-multiline is-centered">
		<div class="column is-4">
			<h2>
				Hub:
				<br />
				{event[0]?.hub}
			</h2>
		</div>
		<div class="column is-4">
			<h2>
				Location:
				<br />
				{event[0]?.location}
			</h2>
		</div>
		<div class="column is-4">
			<h2 class="capitalized">
				Genre:
				<br />
				{event[0]?.category}
			</h2>
		</div>
		<div class="column">
			<h2>
				Start:
				<br />
				{normalizeEventDate(event[0]?.starttime, true)}
			</h2>
		</div>
		<div class="column">
			<h2>
				End:
				<br />
				{normalizeEventDate(event[0]?.endtime, true)}
			</h2>
		</div>
		<div class="column is-4" />
	</div>
</div>

{#if event[0]?.artists.length}
	<h2 class="centered">Artists that supported this event</h2>
	<div class="columns is-multiline">
		{#each event[0]?.artists as artist}
			<ArtistItem {artist} />
		{/each}
	</div>
{/if}

<style lang="scss">
	.info {
		background: $light-grey;
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		.columns {
			max-width: $content-width;
			margin: 0 auto;
			padding: 2em;
		}
	}

	.head {
		background: $light-grey;
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		display: flex;
		height: 100px;
		border-bottom: 0.5px solid $dark-grey;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	h2 {
		&.centered {
			text-align: center;
		}
		&.capitalized {
			text-transform: capitalize;
		}
	}
</style>
