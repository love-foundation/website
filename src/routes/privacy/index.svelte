<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`privacy.json`)
			.then((r) => r.json())
			.then((queriedContent) => {
				return { queriedContent };
			});
	}
</script>

<script>
	import Content from '$lib/components/UI/Content.svelte';
	export let queriedContent;
</script>

<svelte:head>
	<title>Privacy Policy</title>
</svelte:head>

<Content {queriedContent} />
