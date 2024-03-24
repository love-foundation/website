<script lang="ts">
	import type { ConvertedIndexEvents } from "../../../routes/events/_types";

  export let artist: ConvertedIndexEvents["artists"][0]
	export let lazy = false;
</script>

<a
  data-sveltekit-preload-data
	href={`/artists/${artist.slug}`}
	class="column is-one-quarter-desktop is-one-third-tablet"
>
	<div>
		<figure class="image is-square">
			{#if lazy}
				<img class="is-rounded lozad" data-src={artist.imageUrl} alt="{artist.name} Picture" />
			{:else}
				<img class="is-rounded loaded" src={artist.imageUrl} alt="{artist.name} Picture" />
			{/if}
		</figure>
		<h3 data-cy="artistName">{artist.name}</h3>
	</div>
</a>

<style lang="scss">
	h3 {
		text-align: center;
		margin-top: 13px;
		@include mobile {
			margin-top: 18px;
		}
	}
	.image img {
		object-fit: cover;
		text-align: center;
		color: $white;
		opacity: 0;
		margin-top: -50px;
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in,
			transform 0.3s;
		transform: scale(1);
		&:hover {
			transform: scale(1.05);
		}
	}

	:global(.loaded) {
		margin-top: 0 !important;
		opacity: 1 !important;
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in;
	}

	.column {
		padding: 3rem 5rem;
	}

	a:hover {
		color: $black;
	}
</style>
