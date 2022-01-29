<script lang="ts">
	import type { ContentCollection } from '$lib/types';

	export let content: ContentCollection | undefined = undefined;
	export let heroModuleProps:
		| {
				image?: string;
				bgColor?: string;
				heading?: string;
		  }
		| undefined = undefined;

	let heroClass;
	let bgColor: string | boolean;
	let heading: string | boolean;
	let image: string | boolean;
	let bgImage;

	if (content) {
		bgColor = content.hero_background_color ? content.hero_background_color : false;
		image = content.image ? `${process.env.VITE_DIRECTUS_URL}assets/${content.image}` : false;
		heading = content.text ? content.text : false;
	} else {
		({ image, bgColor, heading } = { ...heroModuleProps });
	}

	heroClass = bgColor ? 'bgcolor' : heading ? 'title' : 'bgimage';

	function setVars(node) {
		if (bgColor) {
			node.style.setProperty('--hero-bgcolor', bgColor);
		} else if (!heading) {
			bgImage = 'url("' + image + '"';
			node.style.setProperty('--hero-bgimage', bgImage);
		}
	}
</script>

<div id="hero" class={heroClass}>
	<div class="backdrop" use:setVars class:image={bgImage}>
		{#if heading}
			<h1>{heading}</h1>
		{/if}
	</div>
	<img src={image.toString()} alt="" />
</div>

<style lang="scss">
	#hero {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		margin-top: -3em;
		text-align: center;
		max-height: calc(100vh - #{$mobile-header-height});
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		flex-shrink: 0; // needed when it is used as part of content

		@include desktop {
			max-height: calc(100vh - #{$desktop-header-height});
		}

		img {
			margin: 0 auto;
			z-index: 5;
			filter: brightness(0.97);
		}

		h1 {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			text-align: center;
			color: $white;
			text-shadow: 2px 2px 2px $black;
			z-index: 10;
		}

		&.title {
			img {
				width: 100% !important;
				padding: unset;
				margin: unset;
				z-index: unset;
			}
		}

		.backdrop {
			background-color: var(--hero-bgcolor);
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;

			&.image {
				filter: blur(20px) brightness(0.3);
				margin: -40px -40px -40px -40px;
				background-image: var(--hero-bgimage);
			}
		}
	}
</style>
