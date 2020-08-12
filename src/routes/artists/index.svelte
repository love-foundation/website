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

  $: currentSet = searchedArtists.length > 0 ? searchedArtists : filteredArtists;


  function shuffle() {
    currentSet = shuffleArray(currentSet);
  }
</script>

<style lang="scss">
  .pointer {
    cursor: pointer;
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
  <input type="text" bind:value={searchString} />
  <div class="column is-2">
    <h2
      class="vcentered pointer"
      on:click={() => {
        shuffle();
      }}>
      Shuffle
    </h2>
  </div>
</div>

<div class="columns is-multiline">
  {#each currentSet as artist (artist.id)}
    <ArtistItem {artist} />
  {/each}
</div>
