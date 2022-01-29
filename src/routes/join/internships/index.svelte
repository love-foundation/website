<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const url = '/join/internships.json';
		const res = await fetch(url);

		if (res.ok) {
			const internships = await res.json();
			return {
				props: { queriedContent: internships }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import Button from '$lib/components/UI/Button.svelte';
	import Content from '$lib/components/UI/Content.svelte';
	import type { ContentCollection } from '$lib/types';

	export let queriedContent: ContentCollection[];
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
