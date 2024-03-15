
<script lang="ts">
	import HeroModule from '$lib/components/UI/ContentModules/HeroModule.svelte';
	import GridItem from '$lib/components/UI/Grid/GridItem.svelte';
	import type { ConvertedIndexEvents } from '../../events/_types';
	import type { PageData } from './$types';

  export let data: PageData;

  if(!data.singleArtist) {
    throw new Error('No data found');
  }

	const mapping: {
    [key: number]: string;
  } = {
		0: 'one',
		1: 'two',
		2: 'three'
	};

	let { name, imageUrl, location, category, status, soundcloud, facebook, events, heroColor } = data.singleArtist;
	let heroContent: {
		image?: string;
		bgColor?: string | null;
		heading?: string;
	} = {};

	heroContent.image = imageUrl;
	heroContent.bgColor = heroColor;

	let eventGroups: ConvertedIndexEvents[][] = [];
	for (let i = 0, len = events.length; i < len; i += 3) {
		eventGroups = [...eventGroups, events.slice(i, i + 3)];
	}
</script>

<svelte:head>
	<title>Artists &mdash; {name}</title>
</svelte:head>

<HeroModule heroModuleProps={heroContent} />
<div class="head">
	<h1>{name}</h1>
</div>
<div class="info">
	<div class="columns is-centered">
		{#if location}
			<div class="column">
				<h3 class="light">Hub:</h3>
				<h3 class="light">{location}</h3>
			</div>
		{/if}

		{#if status}
			<div class="column">
				<h3 class="light">Status:</h3>
				<h3 class="light capitalized">{status}</h3>
			</div>
		{/if}

		{#if category}
			<div class="column">
				<h3 class="light">Genre:</h3>
				<h3 class="light capitalized">{category}</h3>
			</div>
		{/if}

		{#if facebook || soundcloud}
			<div class="column">
				<h3 class="light">Links:</h3>
				{#if facebook}
					<a rel="external nofollow" href={facebook}>
						<h3 class="light">Facebook</h3>
					</a>
				{/if}
				{#if soundcloud}
					<a rel="external nofollow" href={soundcloud}>
						<h3 class="light">Soundcloud</h3>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>

{#if events.length}
	<section id="artistevents">
		<h2 class="centered">Events that this artist supported</h2>
		{#each eventGroups as eventGroup}
			<div class="columns is-centered">
				{#each eventGroup as item, i (item.id)}
					<GridItem {item} cardClass={`column is-4 borders ${mapping[i]}`} />
				{/each}
			</div>
		{/each}
	</section>
{/if}

<style lang="scss">
	.info {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		border-bottom: 1px solid $medium-grey;
		.columns {
			padding: 10px 60px;
			.column {
				display: flex;
				*:nth-child(2) {
					padding-left: 5px;
					padding-right: 5px;
				}
			}
		}
	}

	.head {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		display: flex;
		padding-top: 4px;
		border-bottom: 1px solid $medium-grey;
		justify-content: center;
		align-items: center;
		position: relative;
		h1 {
			text-transform: uppercase;
		}
	}

	#artistevents {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		h2 {
			padding-bottom: 40px;
			padding-top: 30px;
		}
		.columns {
			&:nth-child(2) {
				border-top: 1px solid $medium-grey;
			}
			border-bottom: 1px solid $medium-grey;
		}
	}
</style>
