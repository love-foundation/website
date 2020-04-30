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

  export let artists;

  shuffleArray(artists);

</script>

<style lang="scss">

</style>

<svelte:head>
  <title>Artists</title>
</svelte:head>

<div class="columns is-multiline">
  {#each artists as artist}
    <ArtistItem {artist} />
  {/each}
</div>

