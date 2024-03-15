
<script lang="ts">
	import HeroModule from '$lib/components/UI/ContentModules/HeroModule.svelte';
	import ArtistItem from '$lib/components/UI/ArtistItem.svelte';
	import { normalizeEventDate, normalizeTime } from '$lib/helpers/sharedFunctions';
	import type { ConvertedSingleEvent } from '../_types';
	import type { PageData } from './$types';

	export let data: PageData;

  if(!data.singleEvent) {
    throw new Error('No data found');
  }

  const event = data.singleEvent;

	let heroContent: {
		image?: string;
		bgColor?: string;
		heading?: string;
	} = {};

	heroContent.image = event.imageUrl;
	heroContent.bgColor = event.heroColor;
</script>

<svelte:head>
	<title>{event.name}</title>
</svelte:head>

<HeroModule heroModuleProps={heroContent} />
<div class="head">
	<h1>{event.name}</h1>
</div>
<div class="info">
	<div class="columns is-vertical is-multiline is-centered">
		<div class="column is-4">
			<h2>
				Hub:
				<br />
				{event.hub}
			</h2>
		</div>
		<div class="column is-4">
			<h2>
				Location:
				<br />
				{event.location}
			</h2>
		</div>
		<div class="column is-4">
			<h2 class="capitalized">
				Genre:
				<br />
				{event.category}
			</h2>
		</div>
		<div class="column">
			<h2>
				Start:
				<br />
				{normalizeEventDate(event.starttime, true)}
			</h2>
		</div>
		<div class="column">
			<h2>
				End:
				<br />
				{normalizeEventDate(event.endtime, true)}
			</h2>
		</div>
		<div class="column is-4" />
	</div>
</div>

{#if event.artists.length}
	<h2 class="centered">Artists that supported this event</h2>
	<div class="columns is-multiline">
		{#each event.artists as artist}
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
