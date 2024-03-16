<script lang="ts">
	import UpcomingEvents from '$lib/components/UI/FrontPage/UpcomingEvents.svelte';
	import Button from '$lib/components/UI/Button.svelte';
	import Hub from '$lib/components/UI/Hub.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: upcomingEvents =
		data.events?.filter((event) => new Date(event.starttime) >= new Date()) || [];
  $: hubs = data.hubs
</script>

<svelte:head>
	<title>Love Foundation - Home</title>
</svelte:head>
<section id="opener" class="pad--bottom--small">
	<h1>What is Love Foundation?</h1>
	<div class="row">
		<figure class="image">
			<object data="whatislove.svg" type="image/svg+xml" title="Map" />
		</figure>
		<h2>
			Love Foundation is a community of activists and artists spreading love, connecting people and
			raising money for water development projects through cultural events.
		</h2>
		<Button link={'join'}>Join the Family</Button>
	</div>
</section>

{#if upcomingEvents.length > 0}
	<section class="pad--bottom--small">
		<h1 class="centered">Upcoming Events</h1>
		<UpcomingEvents {upcomingEvents} />
	</section>
{/if}

<section class="love-locations pad--bottom--small">
	<div class="row">
		<h1>Where is the Love?</h1>

		<!-- <FullWidthModule {image} /> -->
		<figure class="image">
			<object data="map.svg" type="image/svg+xml" title="Map" />
		</figure>

		<h2 class="main-text">
			Love Foundation was founded in 2013 by two students from Maastricht University and a designer
			in the Netherlands.
			<br />
			We have organised events in the Netherlands, US, Australia, Brazil, Israel, Spain, Germany, UK,
			Italy, Portugal, South Africa and France.
		</h2>
	</div>
</section>

<section class="active-hubs row">
	<h1>Active Love Hubs</h1>
	<div class="columns is-multiline">
    {#if hubs}
      {#each hubs as hub}
        <Hub {hub} />
      {/each}
    {/if}
	</div>
</section>

<section class="cta pad--bottom--small centered">
	<Button link={'join'}>Join the Family</Button>
</section>

<style lang="scss">
	.centered {
		text-align: center;
	}
	object {
		width: 100%;
	}

	/* ########################## */
	/* #### Style Settings ##### */
	/* ########################## */
	.row {
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 40px;
	}
	/* ########################## */
	/* #### Reusable Elements ##### */
	/* ########################## */

	h1,
	h2 {
		text-align: center;
		padding-top: 40px;
		padding-bottom: 20px;
	}

	.main-text {
		padding: 35px;
		line-height: 145%;
		text-align: left;
	}

	#opener {
		text-align: center;
	}
</style>
