<script lang="ts">
	import ArtistItem from '$lib/components/UI/ArtistItem.svelte';
	import { shuffleArray, updateClass, setTransitionDuration } from '$lib/helpers/sharedFunctions';
	import Fuse from 'fuse.js';
	import lozad from 'lozad';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { ConvertedArtist } from './_types';
	export let data: PageData;

	let headerClass = 'show';
	let y = 0;
	let lastY = 0;
	let helper;
	let searchString = '';
	$: artistArray = data.artists;
	$: filteredArtists = artistArray ? shuffleArray<Array<ConvertedArtist>>(artistArray) : [];
	let fuseArtists: Fuse.FuseResult<ConvertedArtist>[];
	let currentSet: ConvertedArtist[] = [];
	let fuseArtistsIds: string[] = [];
	let searchedArtists: ConvertedArtist[] = [];
	let fuseOptions = {
		// isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: true,
		minMatchCharLength: 3,
		// location: 0,
		threshold: 0.2,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: ['id', 'name', 'location', 'category']
	};

	onMount(() => {
		const observer = lozad('.lozad', {
			loaded: function (el: HTMLElement) {
				// Custom implementation on a loaded element
				el.classList.add('loaded');
			}
		});
		observer.observe();
	});

	$: fuse = new Fuse(filteredArtists, fuseOptions);

	$: {
		fuseArtists = fuse.search(searchString);
		fuseArtistsIds = [];

		fuseArtists.forEach((element) => {
			fuseArtistsIds = [...fuseArtistsIds, element.item.id];
		});

		searchedArtists = filteredArtists.filter((a) => fuseArtistsIds.includes(a.id));
	}

	$: currentSet = searchedArtists.length > 0 ? searchedArtists : filteredArtists;

	function shuffle() {
		currentSet = shuffleArray(currentSet);
	}

	$: {
		helper = updateClass(y, lastY);
		headerClass = helper.class;
		lastY = helper.lastY;
	}
</script>

<svelte:head>
	<title>Artists</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<div use:setTransitionDuration class={`topbar columns is-mobile ${headerClass}`}>
	<div class="column is-6-mobile is-2-desktop search-wrap pointer">
		<input
			type="text"
			bind:value={searchString}
			data-cy="searchArtists"
			placeholder="Search Artists.."
		/>
	</div>
	<div class="column is-hidden-mobile" />
	<div class="column is-6-mobile is-2-desktop shuffle">
		<div
			tabindex="0"
			role="button"
			on:click={() => {
				shuffle();
			}}
			on:keydown={() => {
				shuffle();
			}}
			data-cy="shuffleArtists"
		>
			<h2 class="vcentered pointer centered">Shuffle Artists</h2>
		</div>
	</div>
</div>

<section data-cy="artistGrid" class="columns is-multiline">
	{#each currentSet as artist, i (artist.id)}
		<ArtistItem {artist} lazy={i >= 8} />
	{/each}
</section>

<style lang="scss">
	.pointer {
		cursor: pointer;
	}

	.topbar {
		position: fixed;
		width: 100%;
		border-bottom: 1px solid $medium-grey;
		background: $white;
		z-index: 10;
		top: $mobile-header-height;
		left: 0;
		right: 0;
		margin-top: -57px;
		height: $mobile-header-height;
		transition: transform 300ms ease-in-out;

		@include desktop {
			height: $desktop-header-height;
			top: $desktop-header-height;
			margin: 0;
			margin-top: -50px;
		}
		&.show {
			transform: translateY(100%);
		}
		&.hide {
			transform: translateY(0%);
		}
		.search-wrap {
			padding-left: 15px;
			input {
				font-size: 20px !important;
				font-size: 2rem !important;
				border: none;
				width: 100%;
				color: $black !important; //override browser styles

				@include desktop {
					font-size: 30px !important;
					font-size: 3rem !important;
				}
				&::-webkit-input-placeholder,
				&:-moz-placeholder {
					color: $black !important; //override browser styles
				}
			}
		}

		.shuffle {
			margin-top: -1px;
		}
	}

	section {
		margin-top: 3rem;
	}
</style>
