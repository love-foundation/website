<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`join/internships.json`)
			.then((r) => r.json())
			.then((queriedContent) => {
				return { queriedContent };
			});
	}
</script>

<script>
	import Button from '$lib/components/UI/Button.svelte';
	import Content from '$lib/components/UI/Content.svelte';

	export let queriedContent;
</script>

<svelte:head>
	<title>Love Foundation - Work With Us</title>
</svelte:head>

<h1 class="pad--bottom--small centered">Work With Us</h1>

<Content {queriedContent} />

<Button newTab={true} link={'mailto:hello@love-foundation.org'}>Join the family</Button>

<style lang="scss">
	.bubble {
		border-radius: 50%;
		border: 10px solid #555555;
		margin: 5%;
		.image {
			object {
				width: 100%;
				padding: 10%;
			}
		}
	}
</style>
