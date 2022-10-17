<script lang="ts">
	import type { Content as ContentCollection } from '$lib/types';

	export let content: ContentCollection;
	export let lazy: boolean;

	let imageOne;
	let imageTwo;
	let imageOneCaption;
	let imageTwoCaption;
	let fullWidth;
	let double;

	imageOne = content.image
		? `${import.meta.env.VITE_DIRECTUS_URL}assets/${content.image.id}`
		: null;
	imageTwo = content.image_two
		? `${import.meta.env.VITE_DIRECTUS_URL}assets/${content.image_two.id}`
		: null;
	imageOneCaption = content.captions ? content.captions.imageOneCaption : null;
	imageTwoCaption = content.captions ? content.captions.imageTwoCaption : null;
	double = content.type == 'double_image' ? true : false;
	fullWidth = content.type == 'full_width' ? true : false;
</script>

<div class={`column`} class:is-half={!fullWidth}>
	<figure data-toggle-class="loaded" class:lazy class:lozad={lazy} class="image">
		{#if lazy}
			<img class="lozad" data-src={imageOne} alt="" />
		{:else}
			<img src={imageOne} alt="" />
		{/if}
	</figure>
</div>
{#if double}
	<div class="column is-half">
		<figure data-toggle-class="loaded" class:lazy class:lozad={lazy} class="image">
			{#if lazy}
				<img class="lozad" data-src={imageTwo} alt="" />
			{:else}
				<img src={imageTwo} alt="" />
			{/if}
		</figure>
	</div>
{/if}

<style lang="scss">
	.column {
		align-self: center;

		&--image {
			&_left {
				order: 0;
			}
			&_right {
				order: 2;
			}
		}
		&--text {
			order: 1;
		}
	}

	.image.lazy {
		opacity: 0;
		margin-top: -50px;
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in;
		&.loaded {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>
