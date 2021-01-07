<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`artists.json`)
      .then(r => r.json())
      .then(artists => {
        return { artists };
      });
  }
</script>

<script>
  import ArtistItem from "../../components/UI/ArtistItem.svelte";
  import { shuffleArray } from "../../lib/helpers/sharedFunctions.js";
  import Fuse from "fuse.js";
  import lozad from "lozad";
  import { onMount } from "svelte";

  export let artists;

  let searchString = "";
  let artistArray = artists;
  let filteredArtists = shuffleArray(artistArray);
  let fuseArtists = [];
  let currentSet = [];
  let fuseArtistsIds = [];
  let searchedArtists = [];
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
    keys: ["id", "name", "location", "category"]
  };

  onMount(() => {
    const observer = lozad(".lozad", {
      loaded: function(el) {
        // Custom implementation on a loaded element
        el.classList.add("loaded");
      }
    });
    observer.observe();
  });

  const fuse = new Fuse(filteredArtists, fuseOptions);

  $: {
    fuseArtists = fuse.search(searchString);
    fuseArtistsIds = [];

    fuseArtists.forEach(element => {
      fuseArtistsIds = [...fuseArtistsIds, element.item.id];
    });

    searchedArtists = filteredArtists.filter(a =>
      fuseArtistsIds.includes(a.id)
    );
  }

  $: currentSet =
    searchedArtists.length > 0 ? searchedArtists : filteredArtists;

  function shuffle() {
    currentSet = shuffleArray(currentSet);
  }
</script>

<style lang="scss">
  .pointer {
    cursor: pointer;
  }

  .search-wrap {
    input {
      font-size: 20px !important;
      font-size: 2rem !important;
      border: none;
      border-bottom: 3px solid $black;

       @include desktop {
        font-size: 30px !important;
        font-size: 3rem !important;
      }
    }
  }
</style>

<svelte:head>
  <title>Artists</title>
</svelte:head>

<div class="topbar columns is-horizontal">
  <div class="column is-2 hide-on-mobile">
    <h2 class="vcentered">Artists</h2>
  </div>
  <div class="column" />
  <div class="column is-2 search-wrap pointer">
    <input
      type="text"
      bind:value={searchString}
      data-cy="searchArtists"
      placeholder="Search Artists.." />
  </div>
  <div class="column is-2 is-offset-1">
    <h2
      class="vcentered pointer centered"
      on:click={() => {
        shuffle();
      }}
      data-cy="shuffleArtists">
      Shuffle Artists
    </h2>
  </div>
</div>

<div data-cy="artistGrid" class="columns is-multiline">
  {#each currentSet as artist, i (artist.id)}
    <ArtistItem {artist} lazy={i >= 8}/>
  {/each}
</div>
