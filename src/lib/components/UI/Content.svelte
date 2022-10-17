<script lang="ts">
	import TextModule from './ContentModules/TextModule.svelte';
	import TextImageModule from './ContentModules/TextImageModule.svelte';
	import InlineImageModule from './ContentModules/InlineImageModule.svelte';
	import HeroModule from './ContentModules/HeroModule.svelte';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import lozad from 'lozad';
	import type { Content as ContentCollection } from '$lib/types';
	import type { ArrayElement } from 'src/global';

	export let queriedContent: ContentCollection[];

	const availableContentModules = Object.freeze([
		TextModule,
		TextImageModule,
		InlineImageModule,
		HeroModule
	]);
	const moduleMapping = Object.freeze(
		new Map<string, ArrayElement<typeof availableContentModules>>([
			['text_only', TextModule],
			['image_left', TextImageModule],
			['image_only', InlineImageModule],
			['double_image', InlineImageModule],
			['image_right', TextImageModule],
			['full_width', InlineImageModule],
			['full_bleed_hero', HeroModule]
		])
	);

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

{#each queriedContent as content, i (content.id)}
	<section
		data-toggle-class="loaded"
		animate:flip
		class:loaded={i < 3}
		class:lozad={i >= 3}
		class:is-centered={content.type != 'full_bleed_hero'}
		class={`content columns pad--bottom--${content.distance_to_next}`}
	>
		<svelte:component this={moduleMapping.get(content.type)} {content} lazy={i >= 3} />
	</section>
{/each}

<style lang="scss">
	section {
		margin-top: -50px;
		opacity: 0;
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in;
		&.loaded {
			opacity: 1;
			margin-top: 0;
		}
		&:first-child {
			margin-top: 50px;
		}
	}
</style>
