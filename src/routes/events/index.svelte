<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`events.json`).then(r => r.json()).then(events => {
			return { events };
		});
	}
</script>

<script>
	export let events;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Events</title>
</svelte:head>

<h1>Recent events</h1>

<ul>
	{#each events as event}
		<li>
			<ul>
				<li><a rel='prefetch' href="/events/{event.id}">{event.title}</a></li>
				<li><img src="{event.imageUrls.full_url}" alt="{event.title} Poster"></li>
			</ul>
		</li>
	{/each}
</ul>