<script>
  export let artist = {};
  export let lazy = false;
</script>

<style lang="scss">
  h3 {
    text-align: center;
  }
  .image img {
    object-fit: cover;
    text-align: center;
    color: $white;
    opacity: 0;
    margin-top: -50px;
    transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
      opacity 1s ease-in;
  }

  :global(.loaded) {
    margin-top: 0 !important;
    opacity: 1 !important;
    transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
      opacity 1s ease-in;
  }

  .column {
    padding: 5rem;
  }
</style>

<a
  rel="prefetch"
  href="/artists/{artist.slug}"
  class="column is-one-quarter-desktop is-one-third-tablet">
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
